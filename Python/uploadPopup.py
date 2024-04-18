import tkinter as tk
import sys

# Parse command-line arguments
args = sys.argv[1:]

# Default values
popup_name = "Popup"
popup_text = "Hello, World!"

# Parse arguments
for i in range(len(args)):
    if args[i] == "-name" and i + 1 < len(args):
        popup_name = args[i + 1]
    elif args[i] == "-text" and i + 1 < len(args):
        popup_text = args[i + 1]

# Set the DISPLAY environment variable to the correct display
import os
os.environ['DISPLAY'] = ':0.0'

# Create a tkinter window
window = tk.Tk()

# Set window title
window.title(popup_name)

# Set window size
window.geometry("300x200")

# Create a label widget
label = tk.Label(window, text=popup_text)
label.pack()

# Create a button widget
button = tk.Button(window, text="Click Me!")
button.pack()

# Function to be called when the button is clicked
def button_click():
    label.config(text="Button Clicked!")

# Bind the button click event to the function
button.config(command=button_click)

# Run the Tkinter event loop
window.mainloop()
