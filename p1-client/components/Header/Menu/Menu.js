import { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import LoginForm from "../../Auth/LoginForm";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
  const [productTypes, setProductTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
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
        <LoginForm  onCloseModal={onCloseModal}/>
        
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
  const {productsCart} = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              wish list
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              
                {productsCart > 0 && (
                  <Label color="red" floating circular>
                    {productsCart}
                  </Label>
                )}
              
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
