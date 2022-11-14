import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://oxymc.github.io/portfolio-sveltekit', // Update to point to your repository
  user: {
   name: 'Max', // update to use your name
   email: 'skiff4ek@gmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);