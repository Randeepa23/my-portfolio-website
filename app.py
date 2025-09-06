from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_mail import Mail, Message
import os
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'randeepaariyawansa324@gmail.com'  # Your email
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')  # Your app password
app.config['MAIL_DEFAULT_SENDER'] = 'randeepaariyawansa324@gmail.com'

# Initialize Flask-Mail
mail = Mail(app)

# Configuration
app.config['DEBUG'] = os.environ.get('DEBUG', 'False').lower() == 'true'
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Portfolio data
portfolio_data = {
    'personal_info': {
        'name': 'Randeepa Ariyawansa',
        'title': 'Web Designer & Developer',
        'email': 'randeepaariyawansa324@gmail.com',
        'phone': '+94 740 904 523',
        'location': '535/21, Colombo Road, Kurana, Negombo',
        'bio': 'Expert in crafting innovative digital solutions that blend advanced technology with strategic design to deliver impactful results',
        'cv_file': 'Randeepa Ariyawansa_SE_Intern.pdf'
    },
    'skills': [
        {'name': 'HTML5', 'level': 95, 'icon': 'fab fa-html5'},
        {'name': 'CSS3', 'level': 90, 'icon': 'fab fa-css3-alt'},
        {'name': 'JavaScript', 'level': 85, 'icon': 'fab fa-js'},
        {'name': 'React', 'level': 80, 'icon': 'fab fa-react'},
        {'name': 'Python', 'level': 75, 'icon': 'fab fa-python'},
        {'name': 'UI/UX Design', 'level': 88, 'icon': 'fas fa-paint-brush'},
        {'name': 'Video Editing', 'level': 85, 'icon': 'fas fa-video'},
        {'name': 'Responsive Design', 'level': 92, 'icon': 'fas fa-mobile-alt'}
    ],
    'projects': [
        {
            'id': 1,
            'title': 'Digital Marketing Website',
            'description': 'A comprehensive digital marketing platform designed to help businesses grow their online presence with modern tools and analytics.',
            'image': 'digeco-1-1024x586.png',
            'technologies': ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            'demo_link': '#',
            'github_link': '#',
            'category': 'web-design'
        },
        {
            'id': 2,
            'title': 'Food Delivery Platform',
            'description': 'A modern food delivery application with intuitive user interface, real-time tracking, and seamless payment integration.',
            'image': 'download.jfif',
            'technologies': ['React', 'Node.js', 'MongoDB', 'Express'],
            'demo_link': '#',
            'github_link': '#',
            'category': 'web-app'
        },
        {
            'id': 3,
            'title': 'Social Media Platform',
            'description': 'A vibrant social media platform designed to connect people, share experiences, and build communities.',
            'image': 'social media.jfif',
            'technologies': ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
            'demo_link': '#',
            'github_link': '#',
            'category': 'web-design'        }
    ],
    'stats': {
        'websites_completed': 10,
        'landing_pages': 25,
        'happy_clients': 15,
        'years_experience': 2
    },
    'services': [
        {
            'icon': 'fas fa-code',
            'title': 'Web Development',
            'description': 'Custom website development using modern technologies and frameworks.'
        },
        {
            'icon': 'fas fa-paint-brush',
            'title': 'UI/UX Design',
            'description': 'Creating beautiful and user-friendly interfaces that enhance user experience.'
        },
        {
            'icon': 'fas fa-mobile-alt',
            'title': 'Responsive Design',
            'description': 'Ensuring your website looks great on all devices and screen sizes.'
        },
        {
            'icon': 'fas fa-video',
            'title': 'Video Editing',
            'description': 'Professional video editing and creation for marketing and promotional content.'
        }
    ],
    'testimonials': [
        {
            'name': 'John Doe',
            'position': 'CEO, TechCorp',
            'image': 'client1.jpg',
            'rating': 5,
            'review': 'Randeepa delivered an exceptional website that exceeded our expectations. Professional, creative, and reliable.'
        },
        {
            'name': 'Jane Smith',
            'position': 'Marketing Director, StartupXYZ',
            'image': 'client2.jpg',
            'rating': 5,
            'review': 'Outstanding work! The website is beautiful, functional, and has significantly improved our online presence.'
        }
    ]
}

@app.route('/')
def home():
    return render_template('home.html', data=portfolio_data)

@app.route('/about')
def about():
    return render_template('about.html', data=portfolio_data)

@app.route('/projects')
def projects():
    category = request.args.get('category', 'all')
    projects = portfolio_data['projects']
    
    if category != 'all':
        projects = [p for p in projects if p['category'] == category]
    
    return render_template('projects.html', projects=projects, data=portfolio_data)

@app.route('/project/<int:project_id>')
def project_detail(project_id):
    project = next((p for p in portfolio_data['projects'] if p['id'] == project_id), None)
    if not project:
        flash('Project not found', 'error')
        return redirect(url_for('projects'))
    
    return render_template('project_detail.html', project=project, data=portfolio_data)

@app.route('/services')
def services():
    return render_template('services.html', data=portfolio_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            # Get form data
            name = request.form.get('Name')  # Updated to match HTML form field names
            email = request.form.get('email')
            message = request.form.get('Message')
            
            # Validate form data
            if not all([name, email, message]):
                flash('All fields are required', 'error')
                return redirect(url_for('contact'))
            
            # Create contact data for logging
            contact_data = {
                'name': name,
                'email': email,
                'message': message,
                'timestamp': datetime.now().isoformat()
            }
            
            # Send email notification
            try:
                msg = Message(
                    subject=f'New Contact Form Submission from {name}',
                    sender=app.config['MAIL_DEFAULT_SENDER'],
                    recipients=['randeepaariyawansa324@gmail.com']
                )
                msg.body = f"""
New contact form submission:

Name: {name}
Email: {email}
Message: {message}

Submitted on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
                """
                mail.send(msg)
                
                # Also send a confirmation email to the sender
                confirmation_msg = Message(
                    subject='Thank you for contacting Randeepa Ariyawansa',
                    sender=app.config['MAIL_DEFAULT_SENDER'],
                    recipients=[email]
                )
                confirmation_msg.body = f"""
Dear {name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Your message:
{message}

Best regards,
Randeepa Ariyawansa
Web Designer & Developer
randeepaariyawansa324@gmail.com
                """
                mail.send(confirmation_msg)
                
            except Exception as e:
                app.logger.error(f'Email sending error: {str(e)}')
                # Continue with logging even if email fails
            
            # Log to file (backup)
            log_contact_message(contact_data)
            
            flash('Thank you for your message! I will get back to you shortly.', 'success')
            return redirect(url_for('contact'))
            
        except Exception as e:
            flash('An error occurred. Please try again later.', 'error')
            app.logger.error(f'Contact form error: {str(e)}')
            return redirect(url_for('contact'))
    
    return render_template('contact.html', data=portfolio_data)

@app.route('/resume')
def resume():
    return render_template('resume.html', data=portfolio_data)

@app.route('/api/contact', methods=['POST'])
def api_contact():
    """API endpoint for contact form submission"""
    try:
        data = request.get_json()
        
        # Validate data
        required_fields = ['name', 'email', 'subject', 'message']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Process contact data
        contact_data = {
            'name': data['name'],
            'email': data['email'],
            'subject': data['subject'],
            'message': data['message'],
            'timestamp': datetime.now().isoformat()
        }
        
        # Log the contact message
        log_contact_message(contact_data)
        
        return jsonify({'message': 'Message sent successfully!'}), 200
        
    except Exception as e:
        app.logger.error(f'API contact error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/projects')
def api_projects():
    """API endpoint to get projects data"""
    category = request.args.get('category', 'all')
    projects = portfolio_data['projects']
    
    if category != 'all':
        projects = [p for p in projects if p['category'] == category]
    
    return jsonify(projects)

@app.route('/api/stats')
def api_stats():
    """API endpoint to get statistics"""
    return jsonify(portfolio_data['stats'])

def log_contact_message(contact_data):
    """Log contact messages to a file"""
    try:
        # Create logs directory if it doesn't exist
        logs_dir = 'logs'
        if not os.path.exists(logs_dir):
            os.makedirs(logs_dir)
        
        # Append to log file
        log_file = os.path.join(logs_dir, 'contact_messages.json')
        
        # Read existing logs or create empty list
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                logs = json.load(f)
        else:
            logs = []
        
        # Add new message
        logs.append(contact_data)
        
        # Write back to file
        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)
            
    except Exception as e:
        app.logger.error(f'Error logging contact message: {str(e)}')

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

# Template filters
@app.template_filter('year')
def current_year(date):
    return datetime.now().year

@app.template_filter('format_date')
def format_date(date):
    return date.strftime('%B %d, %Y')

# Context processors
@app.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year}

@app.context_processor
def inject_portfolio_data():
    return {'portfolio': portfolio_data}

if __name__ == '__main__':
    # Create static directories if they don't exist
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('static/files', exist_ok=True)
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)
