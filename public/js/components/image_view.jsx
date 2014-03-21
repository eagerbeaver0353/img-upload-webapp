/** @jsx React.DOM **/

var ImageActions = require('../actions/image_actions.js');
var DispatcherMixin = require('../mixins/dispatcher_mixin.js');

var ImageView = React.createClass({
  mixins: [DispatcherMixin],

  getInitialState: function() {
    return { zoomed: false };
  },

  render: function() {
    var content;
    if (this.props.image) {
      var image = this.props.image;
      var cx = React.addons.classSet;

      var backgroundClasses = cx({
        'main-image': true,
        'zoomable': this.isZoomable(),
        'zoomed': this.state.zoomed
      });

      var foregroundClasses = cx({
        'main-image': true,
        'zoomable': this.isZoomable(),
      });

      var zoomedImage = null;
      if (this.state.zoomed) {
        var style = this.calculateZoomedStyles();
        zoomedImage = <img className={foregroundClasses} src={'/i/' + image.id + '.' + image.extension}
             onClick={this.toggleZoom} style={style} />;
      }

      content = (
        <div>
          <div>{image.title}</div>
          <div className='main-image-container'>
            <img className={backgroundClasses} src={'/i/' + image.id + '.' + image.extension}
                 onClick={this.toggleZoom} />
            {zoomedImage}
          </div>
          <div>{image.description}</div>
        </div>
      );
    } else {
      content = <div>Loading...</div>;
    }

    return (
      <div id='single-image'>
        {content}
      </div>
    );
  },

  componentDidMount: function() {
    this.dispatcher.dispatch(ImageActions.loadImage(this.props.imageId));
  },

  componentWillUpdate: function(nextProps) {
    if (nextProps.imageId !== this.props.imageId) {
      this.setState({zoomed: false});
      this.dispatcher.dispatch(ImageActions.loadImage(nextProps.imageId));
    }
  },

  toggleZoom: function() {
    if (this.isZoomable())
      this.setState({zoomed: !this.state.zoomed});
  },

  calculateZoomedStyles: function() {
    var windowWidth = window.innerWidth - 40;
    var x = 20;
    var y = 20;
    var maxWidth = windowWidth;
    var width = this.props.image.width;
    if (width > maxWidth) width = maxWidth;

    var extra = maxWidth - width;
    x += extra / 2;

    return {
      maxWidth: maxWidth,
      position: 'absolute',
      left: x,
      top: y
    };
  },

  isZoomable: function() {
    if (this.props.image.width > 600) {
      return true;
    } else {
      return false;
    }
  }
});

module.exports = ImageView;
