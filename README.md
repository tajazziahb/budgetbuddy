# 💰 BudgetBuddy

A clean, full-stack app that helps users **track income and expenses** through a simple, interactive dashboard.  
Users can sign up, log in, and manage transactions with ease — all wrapped in a smooth, chocolate-orange theme with animated money rain on the homepage.

---

[Link to view project](https://web-production-cff1c.up.railway.app/)   

![screenshot](/public/img/Screenshot%202025-11-02%20at%208.22.00 AM.png) 

## How It’s Made

**Tech Stack**
- HTML, CSS (Frontend)
- Node.js, Express (Server)
- MongoDB, Mongoose (Database)
- EJS (Templating Engine)
- Passport.js (Authentication)
- Railway (Deployment)

**How It Works**
- Users can register and log in using email and password (secured with bcrypt).  
- Once authenticated, each user can:
  - Add transactions (income or expense)
  - Include amount, category, date, and optional notes
  - View recent entries in a live-updating table
  - **Edit transactions directly from the dashboard**
  - Delete transactions when needed  
- A sticky header, compact account card, and rich layout make the experience feel professional yet inviting.  
- The home page features a smooth **money-rain animation** with dollar signs.

---

## Lessons Learned

BudgetBuddy helped me strengthen both my backend logic and front-end presentation skills.  
I learned how to:  
- Build a clean CRUD flow from scratch using Express and MongoDB  
- Connect form data to database actions and render updates dynamically  
- Format and handle dates cleanly across create and update actions  
- Maintain consistent component styling across all EJS templates  
- Structure routes for clarity and scalability in a full-stack app  
- Create a cohesive design system that ties UI, color, and layout together  

---

## Optimizations

- Simplified the dollar rain animation for smoother performance across devices  
- Improved accessibility by respecting `prefers-reduced-motion` settings  
- Streamlined CSS selectors and unified input styling for consistent spacing  
- Refined layout structure for better visual balance on desktop and mobile  
- Optimized session handling and reduced redundant database writes  
- Enhanced edit form flow for cleaner inline updates without reloading entire sections  
- Reduced code repetition between Add, Edit, and Delete actions for better maintainability   

---
