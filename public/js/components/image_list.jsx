/** @jsx React.DOM */

var ImageList = React.createClass({
  render: function() {
    return (
      <div id='image-list'>
        <div className='selector'>
          Showing the most [ <a href='#' className='active'>recent</a> / <a href='#'>voted</a> ] images
        </div>

        <div className='image-list-item'>
          <a href='/image/7q5'>
            <img src='http://localhost:5000/i/7q5-t.gif' />
          </a>
        </div>
        <div className='image-list-item'>
          <a href='/image/7qc'>
            <img src='http://localhost:5000/i/7qc-t.gif' />
          </a>
        </div>
        <div className='image-list-item'>
          <a href='/image/7qcasdf'>
            <img src='http://localhost:5000/i/7qc-t.gif' />
          </a>
        </div>
      </div>
    );
  }
});

module.exports = ImageList;