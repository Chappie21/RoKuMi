import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MainContainer = styled.View`
    width: 100%
    height: 100%
    justifyContent: center
    alignItems: center
`

export const PagesContainer = styled.View`
    width: 100%
`

export const OptionsMenu = styled.View`
    width: 100%
`

export const OptionRow = styled.TouchableOpacity`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-between
`

export const IconOption = styled(MaterialCommunityIcons).attrs(props =>({
    name: props.name,
    size: 24,
    color: props.color
}))`
    flex: 1
`

export const OptionText = styled.Text`
    flex: 1
    color: gray
`

export const HeaderIcons = styled.View`
    display: flex
    flexDirection: row
    alignItems: center
    justifyContent: space-evenly
`