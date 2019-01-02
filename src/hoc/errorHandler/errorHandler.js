import React, { Component } from "react";
import Aux from "../aux";
import Modal from "../../components/UI/modal/modal";

function errorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = { error: null };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        async req => {
          await this.setState({ error: null });
          return req;
        },
        error => Promise.reject(error)
      );
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        async error => {
          await this.setState({ error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    handleBackdrop = async () => {
      await this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal order={this.state.error} clickBackdrop={this.handleBackdrop}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
}

export default errorHandler;
