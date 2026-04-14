# Plugin Folder Structure

This document defines the folder structure for this WordPress plugin, built on the [WordPress Plugin Boilerplate (WPPB)](https://wppb.me). Claude Code must follow these conventions strictly when creating, editing, or moving files.

---

## Root Structure

```
plugin-name/
├── plugin-name.php          # Bootstrap file — plugin metadata and init call only
├── uninstall.php            # Cleanup logic on plugin deletion
├── composer.json            # (if applicable) Composer dependencies
├── includes/                # Core framework + service classes
├── admin/                   # All admin-facing code
├── public/                  # All frontend-facing code
├── languages/               # Translation .pot/.po/.mo files
└── docs/                    # Internal documentation (you are here)
```

---

## `/includes/` — Core Layer

This is the backbone of the plugin. Contains the core loader, lifecycle hooks, and all service/business logic classes.

```
includes/
├── class-plugin-name.php            # Main plugin class — wires everything together
├── class-plugin-name-loader.php     # Centralises all add_action / add_filter calls
├── class-plugin-name-activator.php  # Runs on plugin activation
├── class-plugin-name-deactivator.php# Runs on plugin deactivation
├── class-plugin-name-i18n.php       # Translation/locale setup
│
│   # Add service classes here as the plugin grows:
├── class-plugin-name-api.php        # External API integrations
├── class-plugin-name-db.php         # Custom DB queries / table management
├── class-plugin-name-cpt.php        # Custom post type registrations
└── class-plugin-name-helpers.php    # Shared utility/helper functions
```

**Rules:**
- All business logic lives here, not in Admin or Public classes.
- New feature modules = new class file in `/includes/`, named `class-plugin-name-{feature}.php`.
- The main class (`class-plugin-name.php`) is responsible for instantiating and loading these classes — update it when adding new ones.

---

## `/admin/` — Admin Layer

Everything scoped to the WordPress dashboard.

```
admin/
├── class-plugin-name-admin.php   # Admin hooks, menu pages, settings registration
├── css/
│   └── plugin-name-admin.css     # Admin styles
├── js/
│   └── plugin-name-admin.js      # Admin scripts
└── partials/                     # Admin view templates (HTML/PHP)
    └── plugin-name-admin-display.php
```

**Rules:**
- No business logic here. The Admin class calls service classes from `/includes/`.
- Each settings page or dashboard view gets its own file in `partials/`.
- Enqueue scripts/styles in `class-plugin-name-admin.php` only, via the Loader.

---

## `/public/` — Frontend Layer

Everything scoped to the public-facing site.

```
public/
├── class-plugin-name-public.php  # Frontend hooks, shortcodes, template tags
├── css/
│   └── plugin-name-public.css    # Frontend styles
├── js/
│   └── plugin-name-public.js     # Frontend scripts
└── partials/                     # Frontend view templates (HTML/PHP)
    └── plugin-name-public-display.php
```

**Rules:**
- Same principle as Admin — no logic, only presentation and hook registration.
- Shortcode callbacks belong in `class-plugin-name-public.php`, output goes in `partials/`.

---

## `/languages/`

```
languages/
└── plugin-name.pot    # Master translation template
```

All user-facing strings must use `__()`, `_e()`, or equivalent with the plugin text domain.

---

## Hook Registration Pattern

All `add_action` and `add_filter` calls go through the **Loader** — never call them directly in class constructors or standalone.

```php
// CORRECT — inside the main plugin class
$this->loader->add_action( 'init', $plugin_public, 'register_shortcodes' );

// WRONG — avoid this
add_action( 'init', [ $this, 'register_shortcodes' ] );
```

---

## Naming Conventions

| What | Convention |
|---|---|
| Class files | `class-{plugin-slug}-{feature}.php` |
| Class names | `Plugin_Name_Feature` |
| Hook handles | `plugin-name-{descriptor}` |
| CSS/JS handles | `plugin-name-admin` / `plugin-name-public` |
| Text domain | `plugin-name` |

---

## Where to Put New Code

| Task | Location |
|---|---|
| New API integration | `/includes/class-plugin-name-api.php` |
| New CPT or taxonomy | `/includes/class-plugin-name-cpt.php` |
| New admin settings page | `/admin/class-plugin-name-admin.php` + `admin/partials/` |
| New shortcode | `/public/class-plugin-name-public.php` + `public/partials/` |
| Shared utility function | `/includes/class-plugin-name-helpers.php` |
| DB schema / queries | `/includes/class-plugin-name-db.php` |

---

## What to Avoid

- **Do not** add `add_action` / `add_filter` calls outside of class methods registered through the Loader.
- **Do not** put display HTML directly inside class methods — use `partials/`.
- **Do not** put business logic in Admin or Public classes — delegate to `/includes/` service classes.
- **Do not** create files outside the established structure without updating this doc.
