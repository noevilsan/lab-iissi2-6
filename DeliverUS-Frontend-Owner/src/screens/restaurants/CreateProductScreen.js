import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View , Image, Platform, Switch } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getProductCategories } from '../../api/ProductEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import product from '../../../assets/product.jpeg'
import { showMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import ImagePicker from '../../components/ImagePicker'
import DropDownPicker from 'react-native-dropdown-picker'


export default function CreateProductScreen({ navigation }) {

  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
 async function fetchProductCategories() {
   try {
     const fetchedProductCategories = await getProductCategories()
     const fetchedProductCategoriesReshaped =
       fetchedProductCategories.map(e => {
         return {
           label: e.name,
           value: e.id
         }
       })
     setProductCategories(fetchedProductCategoriesReshaped)
   } catch (error) {
     showMessage({
       message: `There was an error while retrieving products categories. ${error} `,
       type: 'error',
       style: GlobalStyles.flashStyle,
       titleStyle: GlobalStyles.flashTextStyle
     })
   }
 }
 fetchProductCategories()}, [])

  const initialProductValues = {
    name: null,
    description: null,
    price: null,
    order: null,
    availibility: null,
    productCategoryId: null
  }
  return (
    <Formik
      initialValues={initialProductValues}
    >
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem name="name" label="Name:" />
              <InputItem name="description" label="Description:" />
              <InputItem name="price" label="Price:" />
              <InputItem name="order" label="Order:" />
              <InputItem name="order" label="Order:" />
              <InputItem name="phone" label="Phone:" />
              <DropDownPicker
                open={closed}
                value={values.productCategoryId}
                items={productCategories}
                onSelectItem={item => {
                  setFieldValue('productCategoryId', item.value)
                }}
                setItems={setProductCategories}
                placeholder="Select the product category"
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: GlobalStyles.brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}/>
              <ImagePicker
                label="Image:"
                image={values.image}
                defaultImage={product}
                onImagePicked={result => setFieldValue('image', result)}
              />
              <Pressable
                onPress={() => console.log('Submit pressed')}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}
              >
                <TextRegular>Is it available?</TextRegular>
                <Switch
                trackColor={{
                    false: GlobalStyles.brandSecondary,
                    true: GlobalStyles.brandPrimary
                }}
                thumbColor={
                    values.availability ? GlobalStyles.brandSecondary : '#f4f3f4'
                }
                value={values.availability}
                style={styles.switch}
                onValueChange={value => setFieldValue('availability', value)}   // si la función es más compleja, podemos invocar otra función así onValueChange={toggleSwitch}
                />
                <View
                  style={[
                    { flex: 1, flexDirection: 'row', justifyContent: 'center' }
                  ]}
                >
                  <MaterialCommunityIcons
                    name="content-save"
                    color={'white'}
                    size={20}
                  />
                  <TextRegular textStyle={styles.text}>Save</TextRegular>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switch: {
  marginTop: 20}
})