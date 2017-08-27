import React, { Component } from 'react';
import { Container, Row, Col, Button, Jumbotron, Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import AlbumJSON from './Album.json';

export default class Content extends Component {

  state = {
    modal: false,
    album: AlbumJSON,
    cart: [],
  };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  addToCart = (product) => {
    const newcart = this.state.cart;
    newcart.push(product);

    this.setState({
      cart: newcart,
    });
  }

  checkout = (totalPrice) => {
    alert('已從你戶頭扣除{totalPrice}元')
  }

  render() {
    const { cart } = this.state;
    const totalPrice = cart.reduce((acc, item) => (acc += item.price), 0);

    return (
      <Container>
        {JSON.stringify(AlbumJSON)}
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">Hello, react!</h1>
              <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr className="my-2" />
              <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
              <p className="lead">
                <Button color="primary" onClick={this.toggle}>俺是購物車(已選擇 {cart.length} 筆)</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {
            AlbumJSON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBlock>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>價格:{product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button
                      disable={this.state.cart.find(item => item.id === product.id)}
                      color="danger"
                      onClick={() => this.addToCart(product)}>
                    買了 !
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            俺是購物車(已選擇 {cart.length} 筆)
          </ModalHeader>
          <ModalBody>
            已選取的物品
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>品項</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cart.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <p>總價: {totalPrice}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={cart.length === 0}
              color="primary"
              onClick={() => this.checkout(totalPrice)}
            >
            結帳去</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
