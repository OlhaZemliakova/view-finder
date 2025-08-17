import "./App.css";
import { MyFooter } from "./components/my-footer";
import { MyHeader } from "./components/my-header";
import { PopularMoviesList } from "./components/popular-movies-list";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MyHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Movies
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Find your next favorite film
            </p>
          </div>
        </section>

            <PopularMoviesList />
         
       
      </main>

      <MyFooter />
    </div>
  );
}

export default App;
