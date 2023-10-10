export default function Index() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>
          Something went wrong, and you reached a default page.
          Please return to the <a href={window.location.hostname}>Home Page</a>.
        </p>
      </div>
    );
}