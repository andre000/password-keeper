export default function ({ store, error }) {
  if (!store.state.token) {
    error({
      message: 'You are not logged!',
      statusCode: 403,
    });
  }
}
