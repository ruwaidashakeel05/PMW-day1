# Monocular Depth Estimation using Depth Anything v2
# This script takes any image and produces a depth map
# showing how far each part of the image is from the camera

import subprocess
import sys

# Install required libraries if not already installed
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

print("Installing required libraries...")
install("transformers")
install("torch")
install("Pillow")
install("numpy")
install("matplotlib")

import torch
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from transformers import pipeline

print("Loading depth estimation model...")
pipe = pipeline(
    task="depth-estimation",
    model="depth-anything/Depth-Anything-V2-Small-hf"
)

# Download a sample image to test with
import urllib.request
print("Downloading sample image...")
url = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
urllib.request.urlretrieve(url, "sample.jpg")

# Run depth estimation
print("Running depth estimation...")
image = Image.open("sample.jpg")
result = pipe(image)
depth = result["depth"]

# Save the output
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(image)
axes[0].set_title("Original Image")
axes[0].axis("off")

axes[1].imshow(depth, cmap="plasma")
axes[1].set_title("Depth Map")
axes[1].axis("off")

plt.suptitle("Monocular Depth Estimation - PreserveMy.World Experiment")
plt.tight_layout()
plt.savefig("research/depth_output.png", dpi=150)
plt.show()

print("Done! Output saved to research/depth_output.png")