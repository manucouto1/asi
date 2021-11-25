import { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import LoginForm from "../../Auth/LoginForm";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getRole } from "../../../api/roles";

export default function MenuWeb() {
  const [productTypes, setProductTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const userResponse = await getMeApi(logout);
      setUser(userResponse);
      sessionStorage.setItem("user_id", userResponse.id);
      sessionStorage.setItem("user_name", userResponse.username);
      const responseRole = await getRole(userResponse.tipo_rol);
      sessionStorage.setItem("user_role", responseRole.nombre);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuProductTypes productTypes={productTypes} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        {/* <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} /> */}
        <LoginForm onCloseModal={onCloseModal} />
      </BasicModal>
    </div>
  );
}

function MenuProductTypes(props) {
  const { productTypes } = props;
  return (
    <Menu>
      {map(productTypes, (productType) => (
        <Link href={`/zen/${productType.url}`} key={productType._id}>
          <Menu.Item as="a" name={productType.url}>
            {productType.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;

  sessionStorage.setItem('user_id', 1);
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/virtualClassrooms/list">
            <Menu.Item as="a">
              <Icon name="student" />
              Aula virtual
            </Menu.Item>
          </Link>
          <Link href="/scheduler/courses_schedulerV2">
            <Menu.Item as="a">
              <Icon name="calendar alternate outline" />
              Horarios
            </Menu.Item>
          </Link>
          <Link href="/usuario/profile">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.username}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <>
          <Link href="/scheduler/courses_schedulerV2">
            <Menu.Item as="a">
              <Icon name="calendar alternate outline" />
              Horarios
            </Menu.Item>
          </Link>
          <Menu.Item onClick={onShowModal}>
            <Icon name="user outline" />
            Mi cuenta
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
