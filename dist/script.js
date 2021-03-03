const drumKit = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Closed Hat',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579112126/CyCdh_K3ClHat-04_hpuj4y.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Crash',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579112127/CyCdh_K3Crash-07_yrqeow.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Open Hat',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579112127/CYCdh_K2room_OpHat-06_x7rl5x.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Electro Kick',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111954/CYCdh_ElecK05-Kick02_ijzygs.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111952/CYCdh_ElecK05-Clap02_ugsl2g.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Cymbal',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111952/CYCdh_ElecK04-Cymbal02_aobqnc.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Electro Kick 2",
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111952/CYCdh_ElecK03-Kick02_walw4b.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Flam',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111952/CYCdh_K2room_Flam-03_imhc0g.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Electro Kick 3',
  url: 'https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111952/CYCdh_ElecK04-Kick03_aak6kj.mp3' }];



const activeStyle = {
  backgroundColor: '#cc6699',
  boxShadow: "0 3px #660033",
  height: 77,
  marginTop: 13 };


const inactiveStyle = {
  backgroundColor: '#ff99cc',
  marginTop: 10,
  boxShadow: "3px 3px 5px black" };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      this.state.padStyle.backgroundColor === '#cc6699' ?
      this.setState({
        padStyle: inactiveStyle }) :

      this.setState({
        padStyle: activeStyle });

    } else {
      this.state.padStyle.marginTop === 13 ?
      this.setState({
        padStyle: inactiveStyle }) :

      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'gray',
          boxShadow: "0 3px gray" } });


    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: this.props.clipId,
        onClick: this.playSound,
        className: "drum-pad",
        style: this.state.padStyle }, /*#__PURE__*/
      React.createElement("audio", { className: "clip", id: this.props.keyTrigger, src: this.props.clip }),
      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    this.props.power ?
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          clipId: padBankArr[i].id,
          clip: padBankArr[i].url,
          keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));

    }) :
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          clipId: padBankArr[i].id,
          clip: "#",
          keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));

    });
    return /*#__PURE__*/(
      React.createElement("div", { className: "pad-bank" },
      padBank));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: '',
      power: false,
      color: '#002699',
      display: String.fromCharCode(160),
      currentPadBank: drumKit,
      currentPadBankId: 'Heater Kit',
      volume: 30 };

    this.displayClipName = this.displayClipName.bind(this);

    this.volumeDown = this.volumeDown.bind(this);
    this.volumeUp = this.volumeUp.bind(this);

    this.adjustVolume = this.adjustVolume.bind(this);

    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    if (this.state.power) {
      this.setState({
        display: 'POWER OFF',
        color: '#002699' });

      setTimeout(() => this.clearDisplay(), 1000);
      let addSound = document.getElementById("powerOff");
      addSound.currentTime = 0;
      addSound.play();
    } else {
      this.setState({
        display: 'POWER ON',
        color: '#80ff00' });

      let addSound = document.getElementById("powerOn");
      addSound.currentTime = 0;
      addSound.play();
    }
    this.setState({
      power: !this.state.power });

  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }

  volumeDown() {
    if (this.state.power && this.state.volume > 0) {
      this.setState({
        volume: this.state.volume - 5 });

    }
    this.adjustVolume();
  }

  volumeUp() {
    if (this.state.power && this.state.volume < 100) {
      this.setState({
        volume: this.state.volume + 5 });

    }
    this.adjustVolume();
  }

  adjustVolume() {
    if (this.state.power) {
      this.setState(state => ({
        display: 'VOLUME: ' + state.volume + '%' }));


      const audioClips = document.querySelectorAll("audio");
      audioClips.forEach(audio => {
        audio.volume = this.state.volume / 100;
      });
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }
  render() {
    const volumeStyles = this.state.power ? {
      cursor: 'pointer' } :
    {
      cursor: 'default' };


    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine", className: "inner-container" }, /*#__PURE__*/
      React.createElement("div", { className: "logo" }, /*#__PURE__*/
      React.createElement("div", { className: "inner-logo " }, 'Drum|Beat' + String.fromCharCode(160))), /*#__PURE__*/


      React.createElement("div", { className: "controls-container" }, /*#__PURE__*/

      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Power"), /*#__PURE__*/
      React.createElement("div", { className: "select" }, /*#__PURE__*/
      React.createElement("div", { className: "powerButton", onClick: this.powerControl }, /*#__PURE__*/React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, /*#__PURE__*/React.createElement("path", { d: "M256.026 0c-24.816 0-45.004 20.188-45.004 45.004V226.02c0 24.816 20.188 45.004 45.004 45.004s45.004-20.188 45.004-45.004V45.004C301.03 20.188 280.842 0 256.026 0z", fill: this.state.color }), /*#__PURE__*/React.createElement("path", { d: "M406.625 118.959c-18.939-17.083-46.502-15.14-63.041 1.873-16.632 17.109-17.917 46.086 3.153 65.296 33.44 30.395 50.343 76.459 42.336 122.928-10.868 63.067-65.717 112.767-133.05 112.915-68.971.152-121.809-50.77-132.708-110.617-8.497-46.747 7.179-93.553 41.972-125.197 21.01-19.127 19.913-48.232 3.234-65.36-16.567-17.013-44.295-18.851-63.4-1.56-52.909 47.923-80.527 118.769-72.843 190.58C44.496 423.995 140.9 512 256.553 512c114.326 0 207.934-88.216 222.368-194.743 10.064-74.23-16.964-148.358-72.296-198.298z", fill: this.state.color }))), /*#__PURE__*/

      React.createElement("audio", { id: "powerOn", src: "https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111469/cheering1_azkgmm.mp3" }), /*#__PURE__*/
      React.createElement("audio", { id: "powerOff", src: "https://res.cloudinary.com/dlwxy8cnz/video/upload/v1579111468/crowd-groan_yqskqa.mp3" }))), /*#__PURE__*/


      React.createElement("div", { className: "volumeControls" }, /*#__PURE__*/
      React.createElement("p", null, "Volume"), /*#__PURE__*/
      React.createElement("button", { type: "button", onClick: this.volumeDown, style: volumeStyles }, "-"), /*#__PURE__*/
      React.createElement("button", { type: "button", onClick: this.volumeUp, style: volumeStyles }, "+"))), /*#__PURE__*/


      React.createElement("div", null, /*#__PURE__*/
      React.createElement("p", { id: "display" },
      this.state.display)), /*#__PURE__*/


      React.createElement(PadBank, {
        power: this.state.power,
        updateDisplay: this.displayClipName,
        clipVolume: this.state.volume,
        currentPadBank: this.state.currentPadBank })));


  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('root'));