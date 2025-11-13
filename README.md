# 🎂 WishU - Birthday Wish App

A special, multi-step, animated birthday wish application built with **React + Vite**.

This project displays an animated intro, a clickable gift box, and a final celebration screen with background music, an image scroller, and a pop-up diary.

## ✨ Features

* **React + Vite:** A fast, modern development environment.
* **Multi-Step Flow:** Intro -> Gift Box Click -> Main Wish.
* **Dynamic Data:** Personalized name and images loaded from environment variables (`.env`).
* **Media:** Background music, sound effects, and an auto-scrolling image gallery.
* **Interactive:** Clickable gift box and a pop-up modal for a personal note (diary).
* **Animations:** Uses `animate.css` plus custom CSS animations for confetti and balloons.

---

## 🚀 How to Use (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Jainish-2901/happy-birthday.git](https://github.com/Jainish-2901/happy-birthday.git)
    cd MY-WISH-APP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    * Create a new file in the root of the project named `.env`
    * Copy the contents of `.env.example` and paste them into your new `.env` file.

4.  **Fill in your variables:**
    * Open the `.env` file and add your personalized name and image URLs.
    * *(See the "Image Hosting" section below if you don't have URLs yet.)*

5.  **Run the app:**
    ```bash
    npm run dev
    ```
    Your app will be live at `http://localhost:5173`.

---

## ☁️ How to Deploy (Vercel)

This project must use **image hosting** (like Cloudinary) and **environment variables** to be deployed correctly.

### Step 1: Host Your Images (CRITICAL)

1.  **Do not** add your private images (e.g., `girl1.png`) to your Git repository. Make sure they are in your `.gitignore` file.
2.  Upload your images to a hosting service like **Cloudinary** (recommended) or **Imgur**.
3.  Get the **direct URL** for each image (e.g., `https://res.cloudinary.com/.../image1.png`).

### Step 2: Deploy on Vercel

1.  Push your code to your GitHub repository. (Vercel will build from this).
2.  Go to your Vercel dashboard and select **"Add New... Project"**.
3.  Import your GitHub repository.
4.  Before clicking "Deploy", expand the **"Environment Variables"** section.
5.  Add all the variables from your local `.env` file one by one:(you can directly add name & images in code but if you want to keep it safe then you can make .env file, images are valid with any format you want, multiple images you can store)
    * `VITE_NAME` = `Jainish` (or the name you want)
    * `VITE_IMG_1` = `https://res.cloudinary.com/.../image1.png`
    * `VITE_IMG_2` = `https://res.cloudinary.com/.../image2.png`
    * `VITE_IMG_3` = `https://res.cloudinary.com/.../image3.png`
6.  Click **"Deploy"**. Vercel will build your site, and it will correctly load the name and images from the variables you just set.