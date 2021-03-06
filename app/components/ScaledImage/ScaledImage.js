import React, { PropTypes, Component } from 'react'
import { Text, Image, View, Dimensions, PixelRatio } from 'react-native'
import FadeInImage  from './FadeInImage'
const { height,width } = Dimensions.get('window');


class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      debug: 'init',
    };
  }
  static defaultProps = {
    styles: {}
  }


  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
  }

  componentDidMount() {
    if (this.props.id && this.props.width) {
      this.renderImage(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.id && nextProps.width) {
      if (nextProps.id !== this.props.id) {
        this.renderImage(nextProps);
      }
    }
  }

  renderImage(props) {
    const postRetinaWidth = Math.floor(props.width * PixelRatio.get());
    const url = 'http://104.155.46.72/api/v1/images/' + props.id +'/' + postRetinaWidth ;

    const self = this;

    fetch(url,{method: 'GET'}).then((response) => {


        return response.json()
        }
      )
      .then((responseJson) => {
        const pictureWidth = responseJson.width/PixelRatio.get();
        const pictureHeight = responseJson.height/PixelRatio.get();
        const pictureRatio = pictureHeight/pictureWidth;


        self.setState({
          url: responseJson.url,
          width: props.width,
          height: props.width*pictureRatio,
          debug: this.state.debug + ' RV '
        });
      }).catch((error) => {
        console.log(error);
      });
  }





  render() {
    if(this.state.url){
      return (
          <FadeInImage
            shouldRasterizeIOS={true}
            renderToHardwareTextureAndroid={true}
            resizeMode={this.props.resizeMode}
            style={[{'width': this.state.width, 'height': this.state.height}, this.props.styles]}
            source={{uri:this.state.url}}
          />
      );
    } else {
      return(<View/>)
    }
  }
}

export default ScaledImage
