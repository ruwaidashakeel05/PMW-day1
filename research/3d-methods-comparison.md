# 3D Reconstruction Methods — Comparison for PreserveMy.World

## 1. COLMAP / Structure-from-Motion (SfM)
- **Input:** Multiple photos of the same object/place from different angles
- **Output:** Sparse or dense 3D point cloud
- **Hardware:** Regular laptop (slow), GPU speeds it up
- **Difficulty:** Medium — has a UI, good documentation
- **For PreserveMy.World:** Great for scanning heritage sites from tourist photos

## 2. NeRF (Neural Radiance Fields)
- **Input:** 20–100 photos with known camera positions
- **Output:** Photorealistic 3D scene you can fly through
- **Hardware:** Needs a GPU (Google Colab works)
- **Difficulty:** Hard — needs Python and ML knowledge
- **For PreserveMy.World:** Amazing quality for preserving important locations in immersive 3D

## 3. Gaussian Splatting
- **Input:** Photos and camera positions (similar to NeRF)
- **Output:** Real-time 3D scene, faster to render than NeRF
- **Hardware:** Needs a decent GPU
- **Difficulty:** Hard — newer technology, fewer beginner resources
- **For PreserveMy.World:** Best for interactive 3D experiences users can explore in real time

## 4. Monocular Depth Estimation
- **Input:** A single photo or video
- **Output:** Depth map showing how far each pixel is from the camera
- **Hardware:** Runs on laptop or free Google Colab
- **Difficulty:** Easy — one Python script is enough
- **For PreserveMy.World:** Quick way to add depth to existing site photos without needing many images

## Summary — Which fits PreserveMy.World best?

| Method | Best When |
|---|---|
| Monocular Depth | You only have one photo |
| COLMAP | You have 20+ photos of a place |
| NeRF | You want cinematic, photorealistic quality |
| Gaussian Splatting | You want real-time interactive exploration |

## Conclusion
For PreserveMy.World, the most practical starting point is **Monocular Depth Estimation**
because it works with a single image and runs without a GPU. As the project scales,
COLMAP and NeRF become better options for high-quality 3D preservation of heritage sites.

## Reproduced Repo
- **Forked:** [Depth-Anything by LiheYoung](https://github.com/ruwaidashakeel05/Depth-Anything)
- **What I ran:** Monocular depth estimation using Depth-Anything-V2-Small model
- **Output:** See depth_output.png in this folder
- **Result:** The model correctly identified depth layers in a mountain landscape photo