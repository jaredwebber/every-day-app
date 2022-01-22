import {
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
    //Containers
    pageContainer: {
        marginTop: 32,
        paddingHorizontal: 18,
        justifyContent: 'flex-start',
      },

    containerCenter: {
        paddingBottom: 4,
        paddingTop: 4,
        paddingHorizontal: 2,
        alignItems:'center',
    },

    containerLeft:{
        paddingBottom: 4,
        paddingTop: 4,
        paddingHorizontal: 2,
    },

    padItem:{
        paddingBottom: 2,
        paddingTop: 2,
    },

    headerContainer:{
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: 2,
        alignItems:'center',

    },

    //Design
    borderHeader:{
        borderWidth: 3,
        borderColor: "black",
        paddingBottom:4,
        paddingTop:0,
        paddingHorizontal:4,
        borderStyle:'solid',
    },

    //Titles
    titleText:{
        fontWeight:'700',
        fontSize: 32,
    },

    subTitleText:{
        fontWeight:'600',
        fontSize: 24,
    },

    subSubTitleText:{
        fontWeight:'600',
        fontSize: 20,
    },

    bodyText:{
        fontWeight:'400',
        fontSize: 16,
    },  

    //Interaction
    textInput:{
        padding:10,
        fontSize:25,
        fontWeight: '300',

    },

    buttonContainer:{
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3279a8',
    },

    buttonText:{
        fontSize:20,
        fontWeight:'500'
    },

    backgroundImage:{
        marginTop:-60, //Fill Top Notch
        position:'absolute',
        justifyContent:'center',
        height: windowHeight+60,//Account for top notch adjustment
        width: windowWidth,
        opacity:0.3
    },

    //Spacers
    smallSpacer:{
        height:5
    },  

    medSpacer:{
        height:10
    },  

    largeSpacer:{
        height:20
    },  


  });
  
  export default Styles;