# Developers Portfolios
Developers Portfolios is a web application that empowers developers to showcase their work and receive valuable feedback from their peers. The platform enables users to rate and comment on each other's portfolios, fostering a collaborative and supportive community. Users can explore various project categories, creating a dynamic and diverse space for sharing and discovery.

## Architecture:
This full-stack application adopts a clean architecture approach, implementing an MVC architecture on the backend.

### Backend:
- The backend operates as a RESTful API, designed with a clean MVC architecture for enhanced maintainability and scalability.
- Utilizes a relational database, specifically MySQL, leveraging foreign keys to establish relationships between portfolios and their creators.

### Authentication:
- Authentication is seamlessly handled using the NextAuth library, allowing users to sign in effortlessly with their Google and GitHub accounts.

## Frontend:
- The frontend is developed with Chakra UI and Tailwind CSS, combining aesthetics with functionality to build an intuitive and visually appealing user interface.

## Get Started:
To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd developers-portfolios`
3. Install dependencies: `npm install`
4. Configure the backend:
   - Set up MySQL database and update the configuration in the backend.
   - Configure authentication with NextAuth by providing your credentials.
5. Run the application:
   - Start the backend server: `npm run start`

## Contributing:
We welcome contributions to enhance Developers Portfolios! Feel free to fork the repository, create a new branch, and submit a pull request.

Happy coding!

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
