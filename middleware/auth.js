export default function ({
  store, error, redirect,
}) {
  if (!store.state.token) {
    error({
      message: 'You are not logged!',
      statusCode: 403,
    });
    redirect('/login');
  }
}
