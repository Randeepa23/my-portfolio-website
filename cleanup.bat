@echo off
echo Starting repository clean-up...

rem Remove unnecessary files
echo Removing unnecessary files...
if exist index_modern.html del /q index_modern.html
if exist index_upgraded.html del /q index_upgraded.html
if exist index.html del /q index.html
if exist main.py del /q main.py

rem Remove test directory (Python virtual environment)
echo Removing test directory...
if exist test\ rd /s /q test

rem Check and move CSS files
echo Moving CSS files to static/css...
if exist animations.css (
  if exist static\css\animations.css (
    del /q animations.css
  ) else (
    move animations.css static\css\
  )
)

if exist modern-style.css (
  if exist static\css\modern-style.css (
    del /q modern-style.css
  ) else (
    move modern-style.css static\css\
  )
)

if exist style.css (
  if exist static\css\style.css (
    del /q style.css
  ) else (
    move style.css static\css\
  )
)

if exist util.css (
  if exist static\css\util.css (
    del /q util.css
  ) else (
    move util.css static\css\
  )
)

rem Check and move image files
echo Moving image files to static/images...
if exist 0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG (
  if exist static\images\0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG (
    del /q 0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG
  ) else (
    move 0F0F799D-62B1-4FF6-A056-0471E5C85E69.JPG static\images\
  )
)

if exist digeco-1-1024x586.png (
  if exist static\images\digeco-1-1024x586.png (
    del /q digeco-1-1024x586.png
  ) else (
    move digeco-1-1024x586.png static\images\
  )
)

if exist download.jfif (
  if exist static\images\download.jfif (
    del /q download.jfif
  ) else (
    move download.jfif static\images\
  )
)

if exist portfolio1.jpg (
  if exist static\images\portfolio1.jpg (
    del /q portfolio1.jpg
  ) else (
    move portfolio1.jpg static\images\
  )
)

if exist "social media.jfif" (
  if exist "static\images\social media.jfif" (
    del /q "social media.jfif"
  ) else (
    move "social media.jfif" static\images\
  )
)

rem Check and move JS files
echo Moving JS files to static/js...
if exist script.js (
  if exist static\js\script.js (
    del /q script.js
  ) else (
    move script.js static\js\
  )
)

rem Check and move PDF files
echo Moving PDF files to static/files...
if exist "Randeepa Ariyawansa_SE_Intern.pdf" (
  if exist "static\files\Randeepa Ariyawansa_SE_Intern.pdf" (
    del /q "Randeepa Ariyawansa_SE_Intern.pdf"
  ) else (
    move "Randeepa Ariyawansa_SE_Intern.pdf" static\files\
  )
)

echo Repository clean-up completed!
