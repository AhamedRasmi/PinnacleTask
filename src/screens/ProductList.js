import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Dimensions, ToastAndroid, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Divider } from "react-native-elements";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ProductList = () => {

	const [data, setData] = useState([]);
	const [originalData, setOriginalData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resp = await fetch("https://dummyjson.com/products");
				const data = await resp.json();
				setData(data);
				setOriginalData(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const sortedData = data.products && data.products.sort((a, b) => a.title.localeCompare(b.title));

	const openFilterModal = () => {
		setShowModal(true);
	};

	const closeFilterModal = () => {
		setShowModal(false);
	};

	const handleFilter = (min, max) => {
		console.log(min, max, 'MAX MIN')
		if (min === 'ALL' && max === 'ALL') {
			setData(originalData);
			ToastAndroid.show(`All Options selected`, ToastAndroid.SHORT);
		} else if (originalData.products) {
			const filteredData = originalData.products.filter(item => item.price >= min && item.price <= max);
			setData({ products: filteredData })
			ToastAndroid.show(`Price ${min} to ${max} has been selected!`, ToastAndroid.SHORT);
		}
		closeFilterModal();
	}

	const renderItem = ({ item }) => {
		return (
			<View style={styles.cardStyle}>
				<View>
					<Image source={{ uri: item.thumbnail }} style={styles.image} />
				</View>
				<View style={{ paddingHorizontal: 8 }}>
					<Text style={styles.title}>{item.title}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image source={require('../../assets/MiniStar.png')} style={{ height: 18, width: 18 }} />
						<Text style={styles.rating}>{item.rating}</Text>
					</View>
					<Text style={styles.price}>₹{item.price}</Text>
				</View>
			</View >
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Products displaying in ascending order</Text>
			</View>

			<View style={{ alignItems: 'flex-end' }}>
				<TouchableOpacity onPress={openFilterModal}>
					<Image source={require('../../assets/filterIcon.jpg')} style={{ height: 50, width: 50 }} />
				</TouchableOpacity>
			</View>

			{data && (
				<FlatList
					data={sortedData || []}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					numColumns={2}
				/>
			)}

			<Modal
				animationType="slide"
				transparent={true}
				visible={showModal}
				onRequestClose={closeFilterModal}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={closeFilterModal}>
							<Text style={[styles.commonTxt, { color: '#A7A7A7' }]}>Filter the price range</Text>
							<Image source={require('../../assets/cancel.jpg')} style={{ height: 30, width: 30 }} />
						</TouchableOpacity>

						<TouchableOpacity style={{ marginTop: 16 }} onPress={() => handleFilter('ALL', 'ALL')}>
							<Text style={styles.commonTxt}>All</Text>
						</TouchableOpacity>
						<Divider width={0.5} orientation="vertical" />

						<TouchableOpacity style={{ marginTop: 12 }} onPress={() => handleFilter(10, 50)}>
							<Text style={styles.commonTxt}>10 - 50</Text>
						</TouchableOpacity>
						<Divider width={0.5} orientation="vertical" />

						<TouchableOpacity style={{ marginTop: 12 }} onPress={() => handleFilter(50, 100)}>
							<Text style={styles.commonTxt}>50 - 100</Text>
						</TouchableOpacity>
						<Divider width={0.5} orientation="vertical" />

						<TouchableOpacity style={{ marginTop: 12 }} onPress={() => handleFilter(100, 500)}>
							<Text style={styles.commonTxt}>100 - 500</Text>
						</TouchableOpacity>
						<Divider width={0.5} orientation="vertical" />

						<TouchableOpacity style={{ marginTop: 12 }} onPress={() => handleFilter(500, 2000)}>
							<Text style={styles.commonTxt}>500 - 2000</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 9,
		backgroundColor: '#eee',
	},
	header: {
		marginTop: 20,
		height: 60,
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardStyle: {
		padding: 4,
		width: '48%',
		backgroundColor: '#FFFFFF',
		marginTop: 12,
		marginHorizontal: 6, borderRadius: 8,
		paddingBottom: 14
	},
	title: {
		paddingTop: 8,
		fontSize: 14,
		color: '#4E4E4E',
		fontFamily: 'semibold',
		textTransform: 'capitalize',
	},
	image: {
		height: screenHeight / 4.5,
		width: '100%',
		resizeMode: 'contain'
	},
	rating: {
		fontSize: 13,
		color: '#A7A7A7',
		fontFamily: 'semibold',
		lineHeight: 22,
		marginStart: 10
	},
	price: {
		fontSize: 15,
		color: '#1B1B1B',
		fontFamily: 'extrabold',
		lineHeight: 22,
		marginTop: 4
	},
	filterButton: {
		backgroundColor: '#3498db',
		padding: 16,
		alignItems: 'center',
	},
	filterButtonText: {
		color: '#000',
		fontWeight: 'bold',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#EFEFEF',
		height: screenHeight / 3.6,
		width: screenWidth / 1.2,
		padding: 20,
		borderRadius: 12,
	},
	commonTxt: {
		fontSize: 15,
		color: '#1B1B1B',
		fontFamily: 'semibold'
	}
})

export default ProductList;