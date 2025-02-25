# Blogsite - Scalable Cloud-Based Blogging Platform  

This is a [Next.js](https://nextjs.org) project providing a **secure, scalable, and SEO-friendly** blogging experience with a cloud-based infrastructure.

## 🚀 Features  
- **Authentication**: Secure user login and authorization with [Auth.js](https://authjs.dev).  
- **Database**: [MongoDB](https://www.mongodb.com/) for efficient content storage.  
- **Validation**: Data validation using [Zod](https://zod.dev).  
- **Containerization**: Easily deployable using **Docker**.  
- **CI/CD**: Automated deployment with **GitHub Actions**.  

## 🛠 Getting Started  

To set up the development environment, follow these steps:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the blogsite in action.  

## 🐳 Running with Docker  

You can containerize and run this project using Docker:

```bash
docker build -t blogsite .
docker run -p 3000:3000 blogsite
```

## 📌 Tech Stack  

- **Next.js** - SSR & API Routes  
- **React** - UI Development  
- **MongoDB** - Database  
- **Auth.js** - User Authentication  
- **Zod** - Schema Validation  
- **Docker** - Containerization  

## 📚 Learn More  

- [Next.js Documentation](https://nextjs.org/docs)  
- [MongoDB Documentation](https://www.mongodb.com/docs/)  
- [Auth.js Documentation](https://authjs.dev)  
- [Zod Documentation](https://zod.dev)  
- [Docker Documentation](https://docs.docker.com/)  

## 🚀 Deploy on Vercel  

The best way to deploy this project is by using [Vercel](https://vercel.com/), the creators of Next.js.

Check out the [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for more details.
