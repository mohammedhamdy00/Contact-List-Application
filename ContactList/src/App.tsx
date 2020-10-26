import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/contact/create';
import EditContact from './components/contact/Edit';
import ViewContact from './components/contact/view';
import "mdbreact/dist/css/mdb.css";
import "./components/Assets/css/generalStyle.scss"
import Footer from './components/coreComponents/Footer';
import Header from './components/coreComponents/Header';
interface IAppState {
  pageHeight: any;

}
class App extends React.Component<RouteComponentProps<any>, IAppState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      pageHeight:''
    }
}
public componentDidMount ():void{
  const pageDiv=window.innerHeight;
  this.setState({pageHeight: pageDiv-197});
}
  public render() {
    return (
      <div>
        <Header />
        <div style={{minHeight : this.state.pageHeight}}>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/view/edit/:id'} exact component={EditContact} />
          <Route path={'/view/:id'} exact component={ViewContact} />
        </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(App);