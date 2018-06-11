// @flow

import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    Alert
} from 'react-native'

import {Images} from '../Themes'
import SelectArea from '../Components/SelectArea'
import SelectSchool from '../Components/SelectSchool'
import SelectDepartment from '../Components/SelectDepartment'
import SelectEducation from '../Components/SelectEducation'

import {connect} from 'react-redux'
//action
import StudentRegisterActions from '../Redux/StudentRegisterRedux'
// Styles
import styles from './Styles/StudentRegisterStyle'
class StudentRegister extends React.Component {

    componentDidMount() {
        const {type, mobile, password} = this.props.getInitialState
        this.props.schoolSetInitialState({type, mobile, password})
    }

    render() {
        const {
            areaModal,
            schoolModal,
            departmentModal,
            educationModal,
            areaName,
            schoolName,
            departmentName,
            educationName
        } = this.props.state
        const {studentSetData, updateSchoolSubmitData, s_submit} = this.props
        return (
            <View style={styles.container}>
                <Image source={Images.loginBg} style={styles.imageBox}>
                    <View style={styles.mainContainer}>
                        <KeyboardAvoidingView behavior='position'>
                            <Text style={styles.explain}>为了给您提供更好的服务,请填写正确的信息</Text>
                            <View style={styles.item}>
                                <Text style={styles.itemLeft}>&nbsp;&nbsp;姓名</Text>
                                <TextInput placeholder='请输入您的真实姓名' placeholderTextColor='#666'
                                  underlineColorAndroid='transparent'
                                  style={styles.itemRight}
                                  onChangeText={(value) => {
                                    updateSchoolSubmitData('name', value)
                                  }} />
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemLeft}>&nbsp;&nbsp;地区</Text>
                                <Text style={areaName.indexOf('输入') > 0
                                    ? styles.textRightDefault
                                    : styles.textRight} onPress={() => {
                                    studentSetData('areaModal', true)
                                }}>{areaName}
                                </Text>
                                <Image source={Images.arrowRight} style={styles.arrowRight} />
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemLeft}>&nbsp;&nbsp;学校</Text>
                                <Text style={schoolName.indexOf('输入') > 0
                                    ? styles.textRightDefault
                                    : styles.textRight}
                                    onPress={() => { studentSetData('schoolModal', true)}}
                                >{schoolName}
                                </Text>
                                <Image source={Images.arrowRight} style={styles.arrowRight} />
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemLeft}>&nbsp;&nbsp;专业</Text>
                                <Text style={departmentName.indexOf('输入') > 0
                                    ? styles.textRightDefault
                                    : styles.textRight} onPress={() => {
                                    studentSetData('departmentModal', true)
                                }}>{departmentName}
                                </Text>
                                <Image source={Images.arrowRight} style={styles.arrowRight} />
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemLeft}>&nbsp;&nbsp;学历</Text>
                                <Text style={educationName.indexOf('输入') > 0
                                    ? styles.textRightDefault
                                    : styles.textRight}
                                    onPress={() => {studentSetData('educationModal', true)}}
                                >{educationName}
                                </Text>
                                <Image source={Images.arrowRight} style={styles.arrowRight} />
                            </View>
                            <View style={styles.submitContainer}>
                                <Text style={styles.submit} onPress={() => s_submit()}>立即体验</Text>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </Image>

                <Modal animationType={'fade'} transparent={false} visible={areaModal} onShow={() => {}} onRequestClose={() => {}}>
                    <SelectArea />
                </Modal>
                <Modal animationType={'fade'} transparent={false} visible={schoolModal} onShow={() => {}} onRequestClose={() => {}}>
                    <SelectSchool />
                </Modal>
                <Modal animationType={'fade'} transparent={false} visible={departmentModal} onShow={() => {}} onRequestClose={() => {}}>
                    <SelectDepartment />
                </Modal>
                <Modal animationType={'fade'} transparent={false} visible={educationModal} onShow={() => {}} onRequestClose={() => {}}>
                    <SelectEducation />
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {getInitialState: state.register, state: state.studentRegister}
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
    schoolSetInitialState: (getInitialState) => dispatch(StudentRegisterActions.schoolSetInitialState(getInitialState)),
    studentSetData: (key, value) => dispatch(StudentRegisterActions.studentSetData(key, value)),
    updateSchoolSubmitData: (key, value) => dispatch(StudentRegisterActions.updateSchoolSubmitData(key, value)),
    // areaData: () => dispatch(StudentRegisterActions.areaData()),
    s_submit: () => dispatch(StudentRegisterActions.s_submit())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentRegister)
