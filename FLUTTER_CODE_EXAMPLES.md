# Flutter Implementation Quick Reference

## 1. Core Model Classes

### `lib/models/user_model.dart`
```dart
class UserModel {
  final String id;
  final String email;
  final String businessName;
  final String ownerName;
  final String phone;
  final String role;
  final DateTime createdAt;

  UserModel({
    required this.id,
    required this.email,
    required this.businessName,
    required this.ownerName,
    required this.phone,
    required this.role,
    required this.createdAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      businessName: json['businessName'],
      ownerName: json['ownerName'],
      phone: json['phone'],
      role: json['role'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'businessName': businessName,
      'ownerName': ownerName,
      'phone': phone,
      'role': role,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
```

### `lib/models/inventory_model.dart`
```dart
class InventoryItem {
  final String id;
  final String name;
  final String category;
  final double weight;
  final String purity;
  final int quantity;
  final double costPrice;
  final double sellingPrice;
  final double makingCharges;

  InventoryItem({
    required this.id,
    required this.name,
    required this.category,
    required this.weight,
    required this.purity,
    required this.quantity,
    required this.costPrice,
    required this.sellingPrice,
    required this.makingCharges,
  });

  factory InventoryItem.fromJson(Map<String, dynamic> json) {
    return InventoryItem(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      weight: (json['weight'] as num).toDouble(),
      purity: json['purity'],
      quantity: json['quantity'],
      costPrice: (json['costPrice'] as num).toDouble(),
      sellingPrice: (json['sellingPrice'] as num).toDouble(),
      makingCharges: (json['makingCharges'] as num).toDouble(),
    );
  }
}
```

## 2. Provider/State Management

### `lib/providers/auth_provider.dart`
```dart
import 'package:flutter/material.dart';
import 'package:zewar_desk/models/user_model.dart';
import 'package:zewar_desk/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _user;
  String? _token;
  bool _isLoading = false;
  String? _error;

  UserModel? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _token != null;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await ApiService.login(email, password);
      _user = result['user'];
      _token = result['token'];
      
      // Save token
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', _token!);
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> signup({
    required String businessName,
    required String ownerName,
    required String email,
    required String phone,
    required String password,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await ApiService.signup(
        businessName: businessName,
        ownerName: ownerName,
        email: email,
        phone: phone,
        password: password,
      );
      _user = result['user'];
      _token = result['token'];
      
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', _token!);
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    _user = null;
    _token = null;
    notifyListeners();
  }

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
    if (_token != null) {
      // Verify token with backend
      notifyListeners();
    }
  }
}
```

### `lib/providers/inventory_provider.dart`
```dart
import 'package:flutter/material.dart';
import 'package:zewar_desk/models/inventory_model.dart';
import 'package:zewar_desk/services/api_service.dart';

class InventoryProvider extends ChangeNotifier {
  List<InventoryItem> _items = [];
  bool _isLoading = false;
  String? _error;

  List<InventoryItem> get items => _items;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchItems() async {
    _isLoading = true;
    notifyListeners();

    try {
      _items = await ApiService.fetchInventory();
      _error = null;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> addItem(InventoryItem item) async {
    try {
      final newItem = await ApiService.createInventoryItem(item);
      _items.add(newItem);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> updateItem(InventoryItem item) async {
    try {
      await ApiService.updateInventoryItem(item);
      final index = _items.indexWhere((i) => i.id == item.id);
      if (index != -1) {
        _items[index] = item;
        notifyListeners();
      }
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> deleteItem(String id) async {
    try {
      await ApiService.deleteInventoryItem(id);
      _items.removeWhere((item) => item.id == id);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }
}
```

## 3. Services

### `lib/services/api_service.dart`
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:zewar_desk/models/user_model.dart';
import 'package:zewar_desk/models/inventory_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'https://api.zewardesk.com';

  static Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return {
        'user': UserModel.fromJson(data['user']),
        'token': data['token'],
      };
    } else {
      throw Exception('Login failed: ${response.body}');
    }
  }

  static Future<Map<String, dynamic>> signup({
    required String businessName,
    required String ownerName,
    required String email,
    required String phone,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/auth/signup'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'businessName': businessName,
        'ownerName': ownerName,
        'email': email,
        'phone': phone,
        'password': password,
      }),
    );

    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);
      return {
        'user': UserModel.fromJson(data['user']),
        'token': data['token'],
      };
    } else {
      throw Exception('Signup failed: ${response.body}');
    }
  }

  static Future<List<InventoryItem>> fetchInventory() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');

    final response = await http.get(
      Uri.parse('$baseUrl/api/inventory'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((item) => InventoryItem.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load inventory');
    }
  }

  static Future<InventoryItem> createInventoryItem(
    InventoryItem item,
  ) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');

    final response = await http.post(
      Uri.parse('$baseUrl/api/inventory'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode(item),
    );

    if (response.statusCode == 201) {
      return InventoryItem.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to create item');
    }
  }
}
```

## 4. UI Widgets

### `lib/widgets/common/custom_button.dart`
```dart
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final ButtonVariant variant;
  final bool isLoading;

  const CustomButton({
    required this.text,
    required this.onPressed,
    this.variant = ButtonVariant.primary,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final colors = _getButtonColors();

    return ElevatedButton(
      onPressed: isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: colors['background'],
        foregroundColor: colors['foreground'],
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
      child: isLoading
          ? SizedBox(
              height: 20,
              width: 20,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                valueColor: AlwaysStoppedAnimation<Color>(
                  colors['foreground'] as Color,
                ),
              ),
            )
          : Text(text, style: TextStyle(fontWeight: FontWeight.w600)),
    );
  }

  Map<String, dynamic> _getButtonColors() {
    switch (variant) {
      case ButtonVariant.primary:
        return {
          'background': Colors.grey.shade900,
          'foreground': Colors.white,
        };
      case ButtonVariant.secondary:
        return {
          'background': Colors.grey.shade200,
          'foreground': Colors.grey.shade900,
        };
      case ButtonVariant.outline:
        return {
          'background': Colors.transparent,
          'foreground': Colors.grey.shade900,
        };
      case ButtonVariant.danger:
        return {
          'background': Colors.red.shade600,
          'foreground': Colors.white,
        };
    }
  }
}

enum ButtonVariant { primary, secondary, outline, danger }
```

### `lib/widgets/common/custom_input.dart`
```dart
import 'package:flutter/material.dart';

class CustomInput extends StatefulWidget {
  final String label;
  final String placeholder;
  final TextInputType keyboardType;
  final String? errorText;
  final ValueChanged<String> onChanged;
  final String? Function(String?)? validator;
  final bool obscureText;

  const CustomInput({
    required this.label,
    required this.placeholder,
    required this.onChanged,
    this.keyboardType = TextInputType.text,
    this.errorText,
    this.validator,
    this.obscureText = false,
  });

  @override
  State<CustomInput> createState() => _CustomInputState();
}

class _CustomInputState extends State<CustomInput> {
  late TextEditingController _controller;
  bool _showPassword = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.grey.shade700,
          ),
        ),
        SizedBox(height: 8),
        TextField(
          controller: _controller,
          keyboardType: widget.keyboardType,
          obscureText: widget.obscureText && !_showPassword,
          onChanged: widget.onChanged,
          decoration: InputDecoration(
            hintText: widget.placeholder,
            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(
                color: widget.errorText != null ? Colors.red : Colors.grey.shade300,
              ),
            ),
            suffixIcon: widget.obscureText
                ? IconButton(
                    icon: Icon(
                      _showPassword ? Icons.visibility_off : Icons.visibility,
                    ),
                    onPressed: () => setState(() => _showPassword = !_showPassword),
                  )
                : null,
          ),
        ),
        if (widget.errorText != null) ...[
          SizedBox(height: 4),
          Text(
            widget.errorText!,
            style: TextStyle(color: Colors.red, fontSize: 12),
          ),
        ],
      ],
    );
  }
}
```

## 5. Screens

### `lib/screens/auth/login_screen.dart`
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:zewar_desk/providers/auth_provider.dart';
import 'package:zewar_desk/widgets/common/custom_input.dart';
import 'package:zewar_desk/widgets/common/custom_button.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String? _emailError;
  String? _passwordError;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin(AuthProvider authProvider) async {
    // Validate
    setState(() {
      _emailError = null;
      _passwordError = null;
    });

    if (_emailController.text.isEmpty) {
      setState(() => _emailError = 'Email is required');
      return;
    }
    if (_passwordController.text.isEmpty) {
      setState(() => _passwordError = 'Password is required');
      return;
    }

    // Login
    final success = await authProvider.login(
      _emailController.text,
      _passwordController.text,
    );

    if (success) {
      // Navigate to dashboard
      Navigator.of(context).pushReplacementNamed('/dashboard');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(authProvider.error ?? 'Login failed')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login to Zewar Desk')),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Consumer<AuthProvider>(
          builder: (context, authProvider, _) {
            return ListView(
              children: [
                Text(
                  'Welcome Back',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                SizedBox(height: 8),
                Text('Sign in to your account to continue'),
                SizedBox(height: 32),
                CustomInput(
                  label: 'Email Address',
                  placeholder: 'your@email.com',
                  keyboardType: TextInputType.emailAddress,
                  errorText: _emailError,
                  onChanged: (_) => setState(() => _emailError = null),
                ),
                SizedBox(height: 16),
                CustomInput(
                  label: 'Password',
                  placeholder: 'Enter your password',
                  obscureText: true,
                  errorText: _passwordError,
                  onChanged: (_) => setState(() => _passwordError = null),
                ),
                SizedBox(height: 32),
                CustomButton(
                  text: 'Sign In',
                  isLoading: authProvider.isLoading,
                  onPressed: () => _handleLogin(authProvider),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
```

## 6. Main App Setup

### `lib/main.dart`
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:zewar_desk/app/theme.dart';
import 'package:zewar_desk/providers/auth_provider.dart';
import 'package:zewar_desk/providers/inventory_provider.dart';
import 'package:zewar_desk/screens/auth/login_screen.dart';
import 'package:zewar_desk/screens/auth/signup_screen.dart';
import 'package:zewar_desk/screens/dashboard/dashboard_screen.dart';
import 'package:zewar_desk/screens/home/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => InventoryProvider()),
      ],
      child: MaterialApp.router(
        title: 'Zewar Desk',
        theme: AppTheme.lightTheme,
        routerConfig: _buildRouter(),
      ),
    );
  }

  GoRouter _buildRouter() {
    return GoRouter(
      routes: [
        GoRoute(path: '/', builder: (_, __) => HomeScreen()),
        GoRoute(path: '/login', builder: (_, __) => LoginScreen()),
        GoRoute(path: '/signup', builder: (_, __) => SignupScreen()),
        GoRoute(path: '/dashboard', builder: (_, __) => DashboardScreen()),
      ],
    );
  }
}
```

---

## Testing Example

```dart
void main() {
  testWidgets('Login form validation', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());
    
    // Find inputs
    final emailInput = find.byType(TextField).first;
    final passwordInput = find.byType(TextField).last;
    final loginButton = find.byType(CustomButton);
    
    // Tap login without filling
    await tester.tap(loginButton);
    await tester.pump();
    
    // Should show errors
    expect(find.text('Email is required'), findsOneWidget);
    expect(find.text('Password is required'), findsOneWidget);
  });
}
```

---

This gives you a complete template to build your Flutter app!
