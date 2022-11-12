import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {paperTheme} from '@configs/theme.config';
import {getSize} from '@utils/ui.utils';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {Button, RadioButton, TextInput, useTheme} from 'react-native-paper';
import StyledText from '@components/common/Text';
import {SectionTitle} from '@components/common/SectionTitle';
import {EXPENSE_CATEGORIES} from '@configs/app.config';
import {StorageService} from '@services/StorageService';
import {useToast} from 'react-native-paper-toast';

const defaultExpense: Expense = {
  name: '',
  cost: 0,
  category: EXPENSE_CATEGORIES[0].key,
  description: '',
  tripId: 0,
};

interface AddExpenseModalProps {
  tripId: number;
  visible?: boolean;
  onClose?: () => any;
}

const AddExpenseModal = ({tripId, visible, onClose}: AddExpenseModalProps) => {
  const toaster = useToast();
  const {colors} = useTheme();
  const [expense, setExpense] = useState(defaultExpense);

  useEffect(() => {
    setExpense({
      ...expense,
      tripId: tripId,
    });
  }, [tripId]);

  const onFinish = () => {
    StorageService.addTripExpense(expense).then(() => {
      toaster.show({
        message: 'Added expense',
      });
      onClose && onClose();
    });
  };

  return (
    <Modal visible={!!visible} animationType={'slide'}>
      <StatusBarAware
        backgroundColor={colors.background}
        barStyle={'light-content'}
      />
      <View style={styles.modal}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingArea}
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}>
            <View style={styles.outer}>
              <View style={styles.header}>
                <StyledText style={styles.screenTitle}>Add Expense</StyledText>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => onClose && onClose()}>
                  <StyledText style={styles.btnCloseTxt}>Close</StyledText>
                </TouchableOpacity>
              </View>
              <View style={styles.section}>
                <SectionTitle>Expense DETAIL</SectionTitle>
                <TextInput
                  value={expense.name}
                  onChangeText={value =>
                    setExpense({
                      ...expense,
                      name: value,
                    })
                  }
                  mode={'outlined'}
                  label={'Expense Name'}
                  outlineColor={'#ffffff11'}
                  style={styles.input}
                />
                <TextInput
                  value={expense.cost.toString()}
                  onChangeText={value => {
                    const number = parseInt(value, 10);
                    setExpense({
                      ...expense,
                      cost: isNaN(number) ? 0 : number,
                    });
                  }}
                  mode={'outlined'}
                  label={'Cost'}
                  outlineColor={'#ffffff11'}
                  style={styles.input}
                />
              </View>
              <View style={styles.section}>
                <SectionTitle>CATEGORY</SectionTitle>
                <RadioButton.Group
                  value={expense.category}
                  onValueChange={value =>
                    setExpense({
                      ...expense,
                      category: value,
                    })
                  }>
                  {EXPENSE_CATEGORIES.map(cat => (
                    <View style={styles.radioItem} key={cat.key}>
                      <RadioButton value={cat.key} />
                      <StyledText style={styles.radioItemTitle}>
                        {cat.title}
                      </StyledText>
                    </View>
                  ))}
                </RadioButton.Group>
              </View>
              <View style={styles.section}>
                <SectionTitle>DESCRIPTION</SectionTitle>
                <TextInput
                  value={expense.description}
                  onChangeText={value =>
                    setExpense({
                      ...expense,
                      description: value,
                    })
                  }
                  multiline
                  numberOfLines={4}
                  mode={'outlined'}
                  label={'Description'}
                  style={styles.input}
                  placeholder={'Description...'}
                  textColor={'white'}
                  placeholderTextColor={'#ffffff55'}
                  outlineColor={'#ffffff11'}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.actionSection}>
          <Button mode={'contained'} onPress={() => onFinish()}>
            FINISH
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionSection: {
    paddingHorizontal: getSize.m(32),
    paddingVertical: getSize.m(16),
    borderTopWidth: 1,
    borderTopColor: '#ffffff11',
  },
  modal: {
    flex: 1,
    backgroundColor: paperTheme.colors.background,
  },
  keyboardAvoidingArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  outer: {
    flex: 1,
    backgroundColor: paperTheme.colors.background,
    padding: getSize.m(24),
  },
  section: {
    marginTop: getSize.m(16),
  },
  input: {
    backgroundColor: paperTheme.colors.inputBg,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItemTitle: {
    color: 'white',
  },
  screenTitle: {
    fontSize: getSize.m(24),
    color: 'white',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnClose: {
    paddingVertical: getSize.m(16),
    paddingLeft: getSize.m(16),
  },
  btnCloseTxt: {
    fontSize: getSize.m(14),
    fontWeight: '500',
    color: paperTheme.colors.primary,
  },
});

export default AddExpenseModal;
