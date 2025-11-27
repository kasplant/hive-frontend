# Hive Frontend — README

## This are the commands to open the app

# Run website (development)
```bash
npm run dev
```

# Run desktop app (development)
```bash
npx tauri dev
```

# Build desktop app
```bash
npx tauri build
```
Output: src-tauri/target/release/

# Build Android app
```bash
npx cap sync android
```
```bash
npx cap open android
```

# Build iOS app
```bash
npx cap sync ios
```
```bash
npx cap open ios
```












## MAC USERS (Rust required: ```curl https://sh.rustup.rs -sSf | sh```)
1.
```
xcode-select --install
```

2.
```
npm run tauri build
```