import ItemConfig from "./ItemConfig"

export const PolicyItemDetails =({ showActionSheetWithOptions, policy, navigation })=>{
    const options = ItemConfig().map(item => item.title);
        const destructiveButtonIndex = options.length - 1;
        const cancelButtonIndex = options.length - 1;
        showActionSheetWithOptions({
            options,
            icons: ItemConfig().map(item => item.icon),
            cancelButtonIndex,
            destructiveButtonIndex,
            useModal: true
          }, (selectedIndex ) => {
            switch (selectedIndex) {
              case 0:
                navigation.navigate('Coverages', { policyId: policy.id, currency: policy.currency } );
                break;
              case 1:
                navigation.navigate('Requirement', { policyId: policy.id });
                break;
              case 2:
                navigation.navigate('Document', { policyId: policy.id });
                break;
              case 3:
                navigation.navigate('Payments', { policyId: policy.id, currency: policy.currency, code: policy.code });
                break;
      
              case destructiveButtonIndex:
                // Delete
                break;
      
              case cancelButtonIndex:
                // Canceled
        }});
}