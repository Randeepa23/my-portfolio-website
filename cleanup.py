# Repository Clean-up Script
# Run this to remove unnecessary files and organize your project

import os
import shutil
from pathlib import Path

# Define the project root
PROJECT_ROOT = Path(".")

# Files to remove completely
FILES_TO_REMOVE = [
    "index_modern.html",  # We have templates/home.html
    "index_upgraded.html", # We have templates/home.html
    "index.html",         # We have templates/home.html
    "main.py",            # We're using app.py
]

# Directories to remove completely
DIRS_TO_REMOVE = [
    "test",               # Python virtual environment
]

# Files to move to proper locations
FILES_TO_MOVE = {
    # CSS files
    "animations.css": "static/css/animations.css",
    "modern-style.css": "static/css/modern-style.css",
    "style.css": "static/css/style.css",
    "util.css": "static/css/util.css",
    
    # Image files
    "0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG": "static/images/0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG",
    "digeco-1-1024x586.png": "static/images/digeco-1-1024x586.png",
    "download.jfif": "static/images/download.jfif", 
    "portfolio1.jpg": "static/images/portfolio1.jpg",
    "social media.jfif": "static/images/social media.jfif",
    
    # JS files
    "script.js": "static/js/script.js",
    
    # PDF files
    "Randeepa Ariyawansa_SE_Intern.pdf": "static/files/Randeepa Ariyawansa_SE_Intern.pdf",
}

def clean_repository():
    """Cleans up the repository by removing or moving files."""
    print("Starting repository clean-up...")
    
    # Remove files
    for file in FILES_TO_REMOVE:
        file_path = PROJECT_ROOT / file
        if file_path.exists():
            try:
                os.remove(file_path)
                print(f"Removed file: {file}")
            except Exception as e:
                print(f"Error removing {file}: {e}")
    
    # Remove directories
    for directory in DIRS_TO_REMOVE:
        dir_path = PROJECT_ROOT / directory
        if dir_path.exists():
            try:
                shutil.rmtree(dir_path)
                print(f"Removed directory: {directory}")
            except Exception as e:
                print(f"Error removing directory {directory}: {e}")
    
    # Move files to proper locations
    for src, dest in FILES_TO_MOVE.items():
        src_path = PROJECT_ROOT / src
        dest_path = PROJECT_ROOT / dest
        
        # Skip if source doesn't exist or destination already exists
        if not src_path.exists():
            continue
        if dest_path.exists():
            # Skip if identical file already exists in destination
            try:
                if os.path.getsize(src_path) == os.path.getsize(dest_path):
                    print(f"Removing duplicate file: {src} (already exists at {dest})")
                    os.remove(src_path)
                    continue
            except:
                pass
                
        # Ensure destination directory exists
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        try:
            shutil.move(src_path, dest_path)
            print(f"Moved: {src} -> {dest}")
        except Exception as e:
            print(f"Error moving {src} to {dest}: {e}")
    
    print("Repository clean-up completed!")

if __name__ == "__main__":
    clean_repository()
