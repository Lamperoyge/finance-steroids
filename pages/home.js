import withAuth from 'hocs/withAuth';
function Home({ user }) {
  return <div>home</div>;
}

export default withAuth(Home);
