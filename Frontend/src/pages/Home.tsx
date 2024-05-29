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
            <a href={`/notebook/d8f05b10-8c8e-40ee-a9f9-fb70adc34ac3`}>
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
                        href={`/notebook/d8f05b10-8c8e-40ee-a9f9-fb70adc34ac3`}
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
            <a href={`/notebook/730e71f9-f934-4516-be4e-b14e376f50e7`}>
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
                        href={`/notebook/730e71f9-f934-4516-be4e-b14e376f50e7`}
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
            <a href={`/notebook/d48d0f83-6b68-4604-9dc5-bb0c2de39fa5`}>
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
                        href={`/notebook/d48d0f83-6b68-4604-9dc5-bb0c2de39fa5`}
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
            <a href={`/notebook/b3fbc45b-70e8-476d-96a6-f5a2d1102f5a`}>
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
                        href={`/notebook/b3fbc45b-70e8-476d-96a6-f5a2d1102f5a`}
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
