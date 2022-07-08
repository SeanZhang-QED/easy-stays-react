import { Layout, Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { Component } from 'react';
import LoginPage from './component/LoginPage';

const {Header, Content} = Layout;
const authTokenKeyInLocalStorage = "authToken";
const asHostKeyInLocalStorage = "asHost";

class App extends Component {
  state = {
    authed: false,
    asHost: false,
  }

  // Checking Authentication and Authority in mouting phase
  // => setState => step into updating phase => triger re-render
  componentDidMount() {
    const authToken = localStorage.getItem(authTokenKeyInLocalStorage); // string
    const asHost = localStorage.getItem(asHostKeyInLocalStorage);       // boolean    
    this.setState({
      authed: authToken !== null, 
      asHost,
    })
  }

  // Hanlde log in, will be passed into Login component
  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem(authTokenKeyInLocalStorage, token);
    localStorage.setItem(asHostKeyInLocalStorage, asHost);
    this.setState({
      authed: true,
      asHost,
    })
  }

  // Handle log out, delete the token 
  handleLogOut = () => {
    localStorage.removeItem(authTokenKeyInLocalStorage);
    localStorage.removeItem(asHostKeyInLocalStorage);
    this.setState({
      authed: false,
    });
  }

  // For dropdown list items, Dropdown overlay property
  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  // Holding the main logic of rendering home page
  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
 
    if (this.state.asHost) {
      return <div>host home page</div>;
    }
 
    return <div>guest home page</div>;
  };

  render () {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: "white" }}>
            Easy Stays - Easy Booking
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
      </Content>
    </Layout>
    );
  }
}

export default App;
