

Adding / Linking fonts for IOS and Android at once
-------------------------------------------------

Reference:
-----------
https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4


First Step:
------------
Collect all fonts.ttf you want to use for IOS and Android and place it in the Fonts file inside this project. For example ours are in .HyveBoilerPlate/App/Fonts/

Second Step:
-----------
Add the following line in our package.json:

 "rnpm": {
   "assets": ["./App/Fonts/"]
}

Third Step:
-----------
Finally, run in your terminal:
$ react-native link

After running link command you should see something like:
---------------------------------------------------------
-info Linking assects to ios project
-Group 'Resources' does not exist in your xCode project.
 We have created it automatically for you.
-info Linking assets to android project
-info Assets have been successfully linked to your project

That’s all! 💥💥💥💥💥 We are done. All your fonts are linked and can be used for both IOS and Android.

Here is a bit of explanation of what’s going on:
-------------------------------------------------
rnpm — is react native package manager which now is part of React Native core. For earlier usage, we would need to rewrite the third step to rnpm link, but now react-native recognize `link` command by itself.
So on third step packager links fonts in Info.plst for IOS and creates fonts directory (android/app/src/main/assets/fonts) for Android, where copies your fonts


