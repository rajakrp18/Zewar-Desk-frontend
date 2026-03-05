# Zewar Desk - Flutter Replication Guide

## Overview
This guide replicates the Zewar Desk ERP web application (Next.js + React) to Flutter for cross-platform mobile/desktop support.

## Phase 1: Project Setup

### 1. Create Flutter Project
```bash
flutter create zewar_desk --org com.zewardesk
cd zewar_desk
```

### 2. Update `pubspec.yaml`
Add dependencies:
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.0.0+1
  
  # Navigation
  go_router: ^10.0.0
  
  # UI Components
  google_fonts: ^6.1.0
  
  # Networking
  http: ^1.1.0
  
  # Local Storage
  shared_preferences: ^2.2.0
  
  # Forms & Validation
  form_validator: ^2.1.1
  
  # Date/Time
  intl: ^0.18.1
  
  # Logging
  logger: ^2.0.0+1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0
```

Then run:
```bash
flutter pub get
```

## Directory Structure

```
zewar_desk/
├── lib/
│   ├── main.dart
│   ├── app/
│   │   ├── app.dart
│   │   ├── routes.dart
│   │   └── theme.dart
│   ├── models/
│   │   ├── user_model.dart
│   │   ├── inventory_model.dart
│   │   ├── customer_model.dart
│   │   ├── bill_model.dart
│   │   └── order_model.dart
│   ├── providers/
│   │   ├── auth_provider.dart
│   │   ├── inventory_provider.dart
│   │   ├── billing_provider.dart
│   │   └── settings_provider.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── local_storage_service.dart
│   │   └── validation_service.dart
│   ├── screens/
│   │   ├── home/
│   │   │   ├── home_screen.dart
│   │   │   └── home_provider.dart
│   │   ├── auth/
│   │   │   ├── login_screen.dart
│   │   │   ├── signup_screen.dart
│   │   │   └── auth_provider.dart
│   │   ├── dashboard/
│   │   │   ├── dashboard_screen.dart
│   │   │   └── widgets/
│   │   ├── inventory/
│   │   │   ├── inventory_screen.dart
│   │   │   └── inventory_detail_screen.dart
│   │   └── settings/
│   │       └── settings_screen.dart
│   ├── widgets/
│   │   ├── common/
│   │   │   ├── custom_button.dart
│   │   │   ├── custom_input.dart
│   │   │   ├── custom_card.dart
│   │   │   └── custom_appbar.dart
│   │   ├── layouts/
│   │   │   ├── main_layout.dart
│   │   │   └── auth_layout.dart
│   │   └── home/
│   │       ├── hero_section.dart
│   │       ├── features_section.dart
│   │       ├── stats_section.dart
│   │       └── footer_section.dart
│   └── constants/
│       ├── app_colors.dart
│       ├── app_strings.dart
│       └── app_constants.dart
├── pubspec.yaml
└── README.md
```

## Key Implementation Steps

### Step 1: App Configuration (`lib/app/theme.dart`)
```dart
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.light(
      primary: Colors.grey.shade900,
      secondary: Colors.grey.shade600,
      surface: Colors.white,
      background: Colors.grey.shade50,
    ),
    textTheme: TextTheme(
      displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
      headlineMedium: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
      bodyMedium: TextStyle(fontSize: 14, color: Colors.grey.shade700),
    ),
  );
}
```

### Step 2: Models (`lib/models/`)
Create model classes matching the web app's TypeScript types:
- `UserModel` - User authentication data
- `InventoryModel` - Inventory items
- `CustomerModel` - Customer information
- `BillModel` - Billing transactions
- `OrderModel` - Order management

### Step 3: State Management with Provider
Use `provider` package for state management instead of React hooks.

### Step 4: Authentication Flow
- Login screen similar to web login
- Signup with form validation
- JWT token storage in secure storage
- Auto-login with stored tokens

### Step 5: Dashboard Screen
Mirror the web dashboard with:
- Stats cards (Sales, Inventory, Orders, Customers)
- Gold rate display
- Recent transactions list

### Step 6: Core Features Implementation
- **Inventory**: List, search, filter, CRUD
- **Billing**: Create invoice, select items
- **Customers**: Customer database, purchase history
- **Orders**: Track custom orders
- **Reports**: Sales, inventory, profit analytics

## Responsive Design Strategy

### Screen Sizes
```dart
const kSmallPhone = 360.0;      // Small phones
const kPhone = 480.0;           // Regular phones
const kTablet = 768.0;          // Tablets
const kDesktop = 1024.0;        // Desktop/Web
```

### Layout Adaptation
```dart
double getWidth(BuildContext context) {
  return MediaQuery.of(context).size.width;
}

bool isTablet(BuildContext context) {
  return getWidth(context) >= kTablet;
}

bool isDesktop(BuildContext context) {
  return getWidth(context) >= kDesktop;
}
```

## Web Deployment

For running Flutter web version:
```bash
# Enable web support
flutter config --enable-web

# Run web app
flutter run -d chrome

# Build for production
flutter build web --release
```

## Migration Guide: Next.js to Flutter

| Next.js/React | Flutter | Notes |
|---|---|---|
| TypeScript interfaces | Dart classes with `.fromJson()` | Use `json_serializable` |
| React components | Flutter widgets | Stateless/Stateful widgets |
| Hooks (useState) | State/Provider | Use provider package |
| Next.js routing | GoRouter | Package-based routing |
| Tailwind CSS | Flutter ThemeData | Material Design 3 |
| API calls (fetch) | http package | Similar async/await pattern |
| Local storage | shared_preferences | Key-value storage |
| Form validation | form_validator | Similar validation logic |

## Phase 2: Advanced Features
- JWT authentication
- SQLite local database
- Offline mode
- Push notifications
- PDF invoice generation
- Barcode/QR scanning
- Real-time gold rates API

## Testing & Deployment

### Local Testing
```bash
# Run on Android
flutter run -d android

# Run on iOS
flutter run -d ios

# Run on Chrome
flutter run -d chrome
```

### Build for Release
```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release

# Web
flutter build web --release
```

## Database Schema (SQLite - Local Mode)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  businessName TEXT,
  ownerName TEXT,
  phone TEXT,
  password TEXT,
  createdAt TEXT
);

CREATE TABLE inventory_items (
  id TEXT PRIMARY KEY,
  name TEXT,
  category TEXT,
  weight REAL,
  purity TEXT,
  quantity INTEGER,
  costPrice REAL,
  sellingPrice REAL,
  makingCharges REAL
);

-- Similar tables for customers, bills, orders...
```

## API Integration Pattern

```dart
// Example API Service
class ApiService {
  static const String baseUrl = 'https://api.zewardesk.com';
  
  static Future<UserModel> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      body: jsonEncode({'email': email, 'password': password}),
    );
    
    if (response.statusCode == 200) {
      return UserModel.fromJson(jsonDecode(response.body));
    }
    throw Exception('Login failed');
  }
}
```

## Platform-Specific Considerations

### Android
- Min SDK: 21
- Permissions: INTERNET, READ_EXTERNAL_STORAGE
- Target API: 33+

### iOS
- Min iOS: 12.0
- Configure podfile for permissions
- Apple signing required

### Web
- Responsive design for all screen sizes
- PWA capabilities
- Browser compatibility: Chrome, Firefox, Safari

## Performance Optimization

1. **Image optimization** - Use cached_network_image
2. **List virtualization** - Use ListView.builder
3. **State management** - Proper provider scoping
4. **Code splitting** - Lazy load screens
5. **Database indexing** - SQLite optimization

## Security Best Practices

1. ✅ Never store passwords in plain text
2. ✅ Use HttpOnly cookies or secure token storage
3. ✅ Validate all user inputs
4. ✅ Implement HTTPS/SSL
5. ✅ Rate limiting on API endpoints
6. ✅ Encrypt sensitive local data

## Next Steps

1. Start with base project setup and theme
2. Implement authentication (login/signup)
3. Build dashboard with mock data
4. Integrate real API endpoints
5. Add core business features (inventory, billing)
6. Implement offline mode with SQLite
7. Add notifications and advanced features
8. Test on all platforms
9. Deploy to app stores and web hosts

