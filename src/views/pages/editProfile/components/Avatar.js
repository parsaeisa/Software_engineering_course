import React from "react";
import { connect } from "react-redux";
import * as UserAction from "../../../../core/edit_profile/action/UserAction";
// import { Image } from 'antd';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
// import 'antd/dist/antd.css';
import "../../../styles/edit_profile.scss";
import AvatarDialog from "./AvatarDialog";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      openAvatarDialog: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errInfo) {
    // logErrorToMyService(error, errInfo);
  }

  uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
    console.log(btoa(base64));
    this.props.SET_AVATAR(btoa(base64));
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const avatar = "avatar";

    return (
      <div className={this.props.darkmode}>
        <AvatarDialog
          open={this.state.openAvatarDialog}
          src={
            this.props.avatar != null
              ? atob(this.props.avatar)
              : "https://i.stack.imgur.com/l60Hf.png"
          }
          onClose={() => {
            this.setState({
              openAvatarDialog: false,
            });
          }}
        />
        <div className="imageHolder">
          <img
            className="Avatar"
            onClick={() => {
              this.setState({
                openAvatarDialog: true,
              });
            }}
            width={150}
            height={150}
            src={
              this.props.avatar != null
                ? atob(this.props.avatar)
                : "https://i.stack.imgur.com/l60Hf.png"
            }
          />
        </div>
        <div className="camera_button">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id={avatar}
            name={avatar}
            type="file"
            onChange={(e) => {
              this.uploadImage(e);
              this.uploadImage(e);
              this.uploadImage(e);
            }}
          />
          <label htmlFor={avatar}>
            <Button
              component="span"
              className="Button"
              variant="contained"
              color="primary"
              // className={classes.button}
              startIcon={<AddAPhotoIcon />}
            >
              Add photo
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    avatar: state.UserReducer.avatar,
    darkmode: state.dark_mode.darkmode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SET_AVATAR: (t) => dispatch(UserAction.setAvatar(t)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
