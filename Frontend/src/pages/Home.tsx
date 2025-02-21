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
            <a href={`/notebook/b59b26df-d038-4091-bd12-948c330d6c25`}>
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
                        href={`/notebook/b59b26df-d038-4091-bd12-948c330d6c25`}
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
            <a href={`/notebook/a2a4e85c-e3bd-46e6-88cb-6965a0cb9d0e`}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={`${process.env.PUBLIC_URL}/TypingSpeedTest.PNG`} alt="TypingSpeedTest" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <a
                        className="button is-primary"
                        href={`/notebook/a2a4e85c-e3bd-46e6-88cb-6965a0cb9d0e`}
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
            <a href={`/notebook/1fc294ad-8134-40d9-bf7f-084fa98b0bcc`}>
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
                        href={`/notebook/1fc294ad-8134-40d9-bf7f-084fa98b0bcc`}
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
            <a href={`/notebook/20df4cf1-c57f-418e-bd19-1a02dea3da83`}>
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
                        href={`/notebook/20df4cf1-c57f-418e-bd19-1a02dea3da83`}
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
