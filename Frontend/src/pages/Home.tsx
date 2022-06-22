import { Navbar } from "../components/Navbar";
import "../css/pages/Home.css";

export const Home = () => {
  // const [user, loading] = useAuthState(auth);
  // const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  // const [openModal, setopenModal] = useState(false);
  // const navigate = useNavigate();
  // const [loadingStatus, setLoading] = useState(loading);
  // const [status, setStatus] = useState("Request failed");
  // const [error, setError] = useState("");
  // useEffect(() => {
  //   const fetchNotebooks = async () => {
  //     // if (loading) return;
  //     try {
  //       let result = await getFeaturedNotebooks();
  //       console.log(result);
  //       setNotebooks(result || []);
  //       setLoading(false);
  //       setStatus("");
  //     } catch (err: any) {
  //       setLoading(false);
  //       setError(err.message);
  //     }
  //   };
  //   fetchNotebooks();
  // }, [user, loading]);

  return (
    <>
      <Navbar />
      <div className="container">
        {/* {notebooks && !loadingStatus && !error && !(status === 'Request failed') && (
            notebooks.map(notebook => (
              
            ))
          )} */}

        <h1
          className="title is-size-3 has-text-primary"
          style={{ marginTop: "20px" }}
        >
          Featured Notebooks
        </h1>
        <div className="columns is-multiline">
          <div className="column is-12">
            <a href={`/notebook/8f2d6314-55c5-4b06-85ba-fe89890eee7f`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img
                      src={`${process.env.PUBLIC_URL}/DinoGame.PNG`}
                      alt="DinoGame"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <a
                        className="button is-primary"
                        href={`/notebook/8f2d6314-55c5-4b06-85ba-fe89890eee7f`}
                      >
                        Check it out!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="column is-12">
            <a href={`/notebook/c874b754-ff51-4f30-a761-1f6efe29e770`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={`${process.env.PUBLIC_URL}/wheel.PNG`} alt="wheel" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <a
                        className="button is-primary"
                        href={`/notebook/c874b754-ff51-4f30-a761-1f6efe29e770`}
                      >
                        Check it out!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="column is-12">
            <a href={`/notebook/2126a1d9-85f2-4389-a6fb-4c2f33e85a08`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img
                      src={`${process.env.PUBLIC_URL}/bubbleSort.PNG`}
                      alt="bubbleSort"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <a
                        className="button is-primary"
                        href={`/notebook/2126a1d9-85f2-4389-a6fb-4c2f33e85a08`}
                      >
                        Check it out!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <hr />
          <div className="column is-12">
            <a href={`/notebook/6db9664e-913c-45a4-9713-0aa06e44832f`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img
                      src={`${process.env.PUBLIC_URL}/meuNene.PNG`}
                      // style={{ height: "924px" }}
                      alt="Minha Nene"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <a
                        className="button is-primary"
                        href={`/notebook/6db9664e-913c-45a4-9713-0aa06e44832f`}
                      >
                        Check it out!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
