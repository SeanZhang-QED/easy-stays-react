import { Layout, Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { Component } from 'react';
import LoginPage from './component/LoginPage';
import HostHomePage from './component/HostHomePage';
import GuestHomePage from './component/GuestHomePage';

const { Header, Content } = Layout;
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
    const asHost = localStorage.getItem(asHostKeyInLocalStorage) === "true";       // boolean    
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
      return <div>default page</div>;
    }

    if (this.state.asHost) {
      return <HostHomePage />;
    }

    return <GuestHomePage />;
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#FF385C" }}>
            Easy Stays - Easy Booking
          </div>
          {!this.state.authed && (
            <LoginPage handleLoginSuccess={this.handleLoginSuccess} />
          )}
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{
            height: "calc(100% - 64px)",
            margin:0,
            overflow: "auto",
            backgroundColor: "white"
          }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;
