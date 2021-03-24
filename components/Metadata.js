
<SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <TextInput
          placeholder='Search for stocks'
          placeholderTextColor='#dddddd'
          style={{
            backgroundColor: '#2f363c',
            height: 50,
            fontSize: 36,
            padding: 10,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#2f363c',
          }}
          onChangeText={(value) => this.searchStockTickers(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#2f363c' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'top',
              }}
            >
              <ActivityIndicator size='small' color='#8086FB' />
            </View>
          ) : null}
          <FlatList
            data={this.state.searchText}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                {this.state.isSearch ? (
                  <View
                    style={{
                      ...StyleSheet.absoluteFill,
                      alignItems: 'center',
                      justifyContent: 'top',
                    }}
                  >
                    <Text style={{ color: '#6c7ce4' }}>
                      Enter ticker or company name
                    </Text>
                  </View>
                ) : (
                  <Text>{this.state.isSearch}</Text>
                )}
              </View>
            )}
          />
        </View>