import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../constants";
import { removeItem } from "../utils/AsyncStorage";
import { getUser } from "../lib/fetch";
import { useEffect, useState } from "react";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProfileUser = async () => {
    setLoading(true);
    const { data, error } = await getUser();
    if (data) {
      setProfile(data.data);
    }
    if (error) {
      Alert.alert(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    await removeItem("token");
    router.replace("/sign-in");
    Alert.alert("You're log out");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getProfileUser();
    setRefreshing(false);
  };

  useEffect(() => {
    getProfileUser();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="w-full justify-center min-h-screen px-3">
          {loading && <ActivityIndicator size="large" />}
          {!loading && (
            <View className="rounded-lg overflow-hidden bg-white">
              <View className="relative h-[200px]">
                <Image
                  source={images.bg}
                  className="absolute w-full h-full"
                  contain="cover"
                />
                <View className="absolute top-5 left-5">
                  <TouchableOpacity onPress={logout}>
                    <Image
                      source={icons.logout}
                      className="w-5 h-5 rotate-180"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="absolute top-5 right-5">
                  <TouchableOpacity onPress={() => router.push("/edit")}>
                    <Image
                      source={icons.menu}
                      className="w-6 h-5"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="absolute top-32 left-[97px] border-2 border-white rounded-full">
                  <Image
                    source={{ uri: profile?.avatar }}
                    className="w-36 h-36 rounded-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View className="pt-20 pb-10 items-center px-8">
                <Text className="font-pbold text-2xl">{profile?.fullname}</Text>
                <Text className="font-pregular">
                  {profile?.city}, {profile?.country}
                </Text>
                <Text className="text-xl font-pmedium">{profile?.job}</Text>
                <Text className="text-sm font-pregular text-center mt-3 mb-10">
                  {profile?.about || "-"}
                </Text>
                <View className="flex-row gap-12 justify-center">
                  {profile?.instagram && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(profile?.instagram)}
                    >
                      <Image
                        source={icons.instagram}
                        className="w-12 h-12"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                  {profile?.facebook && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(profile?.facebook)}
                    >
                      <Image
                        source={icons.facebook}
                        className="w-11 h-11"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                  {profile?.twitter && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(profile?.twitter)}
                    >
                      <Image
                        source={icons.twitter}
                        className="w-10 h-11"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
