import BasicLayout from "../layouts/BasicLayout";
import Seo from "../components/Seo";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

  return (
    <BasicLayout className="home">
      <Seo/>
    </BasicLayout>
  );
}
