import Header from "../components/header";

function createEventPage() {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold mb-6">Create Event Page</h1>
      <p className="text-lg text-gray-700">
        This is where you can create a new event.
      </p>
    </div>
  );
}
export default createEventPage;
