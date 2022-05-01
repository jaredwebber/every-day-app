import {StyleSheet, Dimensions} from 'react-native';

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
		alignItems: 'center',
	},

	containerLeft: {
		paddingBottom: 4,
		paddingTop: 4,
		paddingHorizontal: 2,
	},

	padItem: {
		paddingBottom: 2,
		paddingTop: 2,
	},

	headerContainer: {
		paddingBottom: 8,
		paddingTop: 8,
		paddingHorizontal: 2,
		alignItems: 'center',
	},

	row: {
		alignItems: 'center',
		flexDirection: 'row',
	},

	//Design
	borderHeader: {
		borderWidth: 3,
		borderColor: 'black',
		paddingBottom: 4,
		paddingTop: 0,
		paddingHorizontal: 4,
		borderStyle: 'solid',
	},

	//Titles
	titleText: {
		fontWeight: '700',
		fontSize: 32,
	},

	subTitleText: {
		fontWeight: '600',
		fontSize: 24,
	},

	subSubTitleText: {
		fontWeight: '600',
		fontSize: 20,
	},

	bodyText: {
		fontWeight: '400',
		fontSize: 16,
	},

	//Interaction
	textInput: {
		padding: 6,
		fontSize: 25,
		fontWeight: '300',

		borderBottomWidth: 1,
		borderBottomRightRadius: 9,
		borderBottomLeftRadius: 9,
		borderColor: '#404040',
		borderStyle: 'solid',
		color: 'black',
		margin: 1,
	},

	buttonContainer: {
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 4,
		paddingHorizontal: 16,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#3279a8',
	},

	leftButton: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 4,
		paddingHorizontal: 16,
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		elevation: 3,
		backgroundColor: '#3279a8',
	},

	rightButton: {
		marginTop: 5,
		marginBottom: 5,
		marginRight: 5,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 4,
		paddingHorizontal: 16,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		elevation: 3,
		backgroundColor: '#3279a8',
	},

	selectedButton: {
		backgroundColor: 'red',
	},

	unselectedButton: {
		backgroundColor: 'blue',
	},

	buttonText: {
		fontSize: 20,
		fontWeight: '500',
	},

	dropdownContainer: {
		width: (2 * windowWidth) / 3,
	},

	backgroundImage: {
		marginTop: -60, //Fill Top Notch
		position: 'absolute',
		justifyContent: 'center',
		height: windowHeight + 60, //Account for top notch adjustment
		width: windowWidth,
		opacity: 0.3,
	},

	//Spacers
	smallSpacer: {
		height: 5,
	},

	medSpacer: {
		height: 10,
	},

	largeSpacer: {
		height: 20,
	},
});

export default Styles;
