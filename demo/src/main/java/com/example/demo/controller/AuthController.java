package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UsuarioRepository usuarioRepository) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (passwordEncoder.matches(password, userDetails.getPassword())) {
                String token = jwtService.generateToken(username);
                Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();

                String rol = switch (usuario.getEstado()) {
                    case 1 -> "admin";
                    case 3 -> "superadmin";
                    default -> "cliente";
                };

                return ResponseEntity.ok(Map.of(
                    "token", token,
                    "estado", usuario.getEstado(),
                    "rol", rol
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Contraseña incorrecta"));
            }
        } catch (org.springframework.security.core.userdetails.UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Usuario no encontrado"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error interno: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
        String username = registerRequest.get("username");
        String password = registerRequest.get("password");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Faltan datos"));
        }

        if (usuarioRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(400).body(Map.of("error", "El usuario ya existe"));
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(username);
        nuevoUsuario.setPassword(passwordEncoder.encode(password));
        nuevoUsuario.setEstado(2); // Cliente por defecto
        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado con éxito"));
    }

    @GetMapping("/usuarios")
    public List listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(itemUsuario -> {
                    String rolUsuario = switch (itemUsuario.getEstado()) {
                        case 1 -> "admin";
                        case 3 -> "superadmin";
                        default -> "cliente";
                    };

                    Map<String, Object> filaUsuario = new LinkedHashMap<>();
                    filaUsuario.put("id", itemUsuario.getId());
                    filaUsuario.put("username", itemUsuario.getUsername());
                    filaUsuario.put("nombre", itemUsuario.getUsername());
                    filaUsuario.put("email", itemUsuario.getUsername().contains("@")
                            ? itemUsuario.getUsername()
                            : itemUsuario.getUsername() + "@tudiaespecial.cl");
                    filaUsuario.put("rol", rolUsuario);
                    filaUsuario.put("estado", itemUsuario.getEstado());
                    filaUsuario.put("telefono", "Sin registro");
                    filaUsuario.put("foto", "");
                    return filaUsuario;
                })
                .toList();
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody Map<String, Object> editRequest) {
        return usuarioRepository.findById(id)
                .map(usuarioExistente -> {
                    if (editRequest.get("nombre") != null && !editRequest.get("nombre").toString().isBlank()) {
                        usuarioExistente.setUsername(editRequest.get("nombre").toString().trim());
                    } else if (editRequest.get("username") != null && !editRequest.get("username").toString().isBlank()) {
                        usuarioExistente.setUsername(editRequest.get("username").toString().trim());
                    }

                    if (editRequest.get("rol") != null) {
                        String rolEditado = editRequest.get("rol").toString().toLowerCase();
                        int estadoEditado = switch (rolEditado) {
                            case "admin" -> 1;
                            case "superadmin" -> 3;
                            default -> 2;
                        };
                        usuarioExistente.setEstado(estadoEditado);
                    }

                    Usuario usuarioGuardado = usuarioRepository.save(usuarioExistente);
                    String rolFinal = switch (usuarioGuardado.getEstado()) {
                        case 1 -> "admin";
                        case 3 -> "superadmin";
                        default -> "cliente";
                    };

                    Map<String, Object> respuestaUsuario = new LinkedHashMap<>();
                    respuestaUsuario.put("id", usuarioGuardado.getId());
                    respuestaUsuario.put("username", usuarioGuardado.getUsername());
                    respuestaUsuario.put("nombre", usuarioGuardado.getUsername());
                    respuestaUsuario.put("email", usuarioGuardado.getUsername().contains("@")
                            ? usuarioGuardado.getUsername()
                            : usuarioGuardado.getUsername() + "@tudiaespecial.cl");
                    respuestaUsuario.put("rol", rolFinal);
                    respuestaUsuario.put("estado", usuarioGuardado.getEstado());
                    respuestaUsuario.put("telefono", "Sin registro");
                    respuestaUsuario.put("foto", "");
                    return ResponseEntity.ok(respuestaUsuario);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario eliminado"));
    }
}