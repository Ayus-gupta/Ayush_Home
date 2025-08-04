# Into Imagination - Vue App

This is a creative multi-room Vue.js application inspired by the storytelling web series **"Into Imagination"**. Each virtual room—Kitchen, My Room, TV Room, and Secret Room—offers a unique interaction inspired by stories, food, music, secrets, and user imagination.

---

## 🌟 Application Concept

The app presents the **imaginative world of a boy named Ayush**, who explores books and experiences stories in different dimensions. Each room reflects his imagination:

- **Kitchen Room**: Recipe suggestions & reviews.
- **My Room**: Books, music, and user story requests.
- **TV Room**: For watching & imagining scenes from stories.
- **Secret Room**: A safe space for sharing innocent secrets and imagination prompts.

The navigation simulates movement between parts of Ayush’s mind.

---

## 🧠 Features by Room

### 🥘 MyKitchen
- Display recipes with short descriptions.
- Users can select dishes and write reviews.
- Reviews persist across reloads using `localStorage`.

### 📚 MyRoom
- Display a collection of short fictional books.
- Users can read stories, request new ones, and play ambient music.
- All requests are saved in `localStorage`.

### 📺 TVRoom
- Allows sharing imaginative TV show ideas or thoughts.
- Requests stored via `localStorage`.
- Follows promise system for unlocking content.

### 🤫 SecretRoom
- Displays innocent secrets and encourages users to write their own.
- Requests saved using `localStorage`.
- Adds privacy by asking for a promise before accessing.

---

## 🚀 Techniques & Technologies Used

| Area                 | Implementation Details                        |
|----------------------|-----------------------------------------------|
| **Framework**        | Vue.js 3 (CDN version)                        |
| **Routing**          | Vue Router (via `createWebHashHistory`)      |
| **State Management** | Local component state + localStorage         |
| **Data Persistence** | `localStorage` used to save reviews/requests |
| **Interactivity**    | Reactive UI via Vue’s `ref`, `methods`, etc. |
| **Audio**            | HTML5 Audio element for MyRoom music         |
| **Responsive UI**    | Responsive layout with minimal CSS & HTML    |

---

## 📦 Setup Instructions

This app uses only Vue 3 via CDN and requires no build tools.

1. Clone the repository:

```bash
git clone https://github.com/Ayus-gupta/Ayush_Home
cd Ayush_Home

