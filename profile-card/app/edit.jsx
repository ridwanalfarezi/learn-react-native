import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { icons } from "../constants";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { getUser, updateUser } from "../lib/fetch";
import convertToBase64, { getFileTypeFromUri } from "../utils/convertToBase64";

const Edit = () => {
  const [form, setForm] = useState({
    fullname: "",
    avatar: "",
    city: "",
    country: "",
    job: "",
    about: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProfileUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUser();
      if (data) {
        setForm({
          fullname: data.data.fullname,
          avatar: data.data.avatar,
          city: data.data.city,
          country: data.data.country,
          job: data.data.job,
          about: data.data.about,
          instagram: data.data.instagram,
          facebook: data.data.facebook,
          twitter: data.data.twitter,
        });
      }
      if (error) {
        Alert.alert(error);
      }
    } catch (error) {
      Alert.alert("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      setForm({ ...form, avatar: result.assets[0].uri });
      const avatar = await convertToBase64(result.assets[0].uri);
      if (avatar) {
        setImage(avatar);
      }
    }
  };

  const submit = async () => {
    const body = {
      fullname: form.fullname,
      city: form.city,
      country: form.country,
      job: form.job,
      about: form.about,
      instagram: form.instagram,
      facebook: form.facebook,
      twitter: form.twitter,
      avatar: image,
    };

    setIsSubmitting(true);
    try {
      const { data, error } = await updateUser(body);
      if (data) {
        Alert.alert(data.msg || "Success");
        router.replace("/");
      }
      if (error) {
        Alert.alert(error);
      }
    } catch (error) {
      Alert.alert("An error occurred while updating user data.");
    }
    setIsSubmitting(false);
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
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          {loading && <ActivityIndicator size="large" />}
          {!loading && (
            <>
              <View className="flex-row gap-5 items-center">
                <TouchableOpacity onPress={() => router.push("/")}>
                  <Image source={icons.leftArrow} className="w-7" />
                </TouchableOpacity>
                <Text className="text-white text-2xl font-psemibold">
                  Edit Profile
                </Text>
              </View>
              <FormField
                title="Full Name"
                placeholder="Enter Your Full Name"
                value={form?.fullname}
                handleChangeText={(value) =>
                  setForm({ ...form, fullname: value })
                }
                otherStyles="mt-10"
              />
              <View className="mt-7 space-y-2">
                <Text className="text-base text-gray-100 font-pmedium">
                  Avatar
                </Text>
                {form.avatar ? (
                  <TouchableOpacity onPress={openPicker}>
                    <Image
                      source={{ uri: form.avatar }}
                      className="w-40 h-40 rounded-full m-auto"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={openPicker}>
                    <Text className="text-gray-100">Select an avatar</Text>
                  </TouchableOpacity>
                )}
                <Text className="text-sm text-gray-100 font-pmedium text-center">
                  Recommended resolution 1 : 1
                </Text>
              </View>
              <FormField
                title="City"
                placeholder="Enter Your City"
                value={form?.city}
                handleChangeText={(value) => setForm({ ...form, city: value })}
                otherStyles="mt-7"
              />
              <FormField
                title="Country"
                placeholder="Enter Your Country"
                value={form?.country}
                handleChangeText={(value) =>
                  setForm({ ...form, country: value })
                }
                otherStyles="mt-7"
              />
              <FormField
                title="Job"
                placeholder="Enter Your Job"
                value={form?.job}
                handleChangeText={(value) => setForm({ ...form, job: value })}
                otherStyles="mt-7"
              />
              <FormField
                title="About"
                placeholder="Tell About Yourself"
                value={form?.about}
                handleChangeText={(value) => setForm({ ...form, about: value })}
                otherStyles="mt-7"
                inputStyles="h-44 items-start py-2"
                multiline={true}
                numberOfLines={10}
              />
              <FormField
                title="Facebook"
                placeholder="Enter Your Facebook"
                value={form?.facebook}
                handleChangeText={(value) =>
                  setForm({ ...form, facebook: value })
                }
                otherStyles="mt-7"
              />
              <FormField
                title="Instagram"
                placeholder="Enter Your Instagram"
                value={form?.instagram}
                handleChangeText={(value) =>
                  setForm({ ...form, instagram: value })
                }
                otherStyles="mt-7"
              />
              <FormField
                title="Twitter"
                placeholder="Enter Your Twitter"
                value={form?.twitter}
                handleChangeText={(value) =>
                  setForm({ ...form, twitter: value })
                }
                otherStyles="mt-7"
              />

              <CustomButton
                title="Update"
                onPress={submit}
                containerStyle="mt-7"
                isLoading={isSubmitting}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
