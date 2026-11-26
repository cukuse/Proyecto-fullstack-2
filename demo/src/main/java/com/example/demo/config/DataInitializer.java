package com.example.demo.config;

import com.example.demo.model.Producto;
import com.example.demo.model.Usuario;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository,
                           ProductoRepository productoRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        usuarioRepository.deleteAll(); // Asegura un arranque limpio

        Usuario admin = new Usuario();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEstado(1); // 1 = admin, 2 = cliente, 3 = superadmin
        usuarioRepository.save(admin);

        System.out.println("====== USUARIO CREADO EXITOSAMENTE EN H2 (admin / admin123 - ADMIN) ======");

        productoRepository.deleteAll();

        List<Producto> productosIniciales = List.of(
            new Producto(
                "Matrimonio Premium",
                "Hasta 150 personas",
                 80000.0,
                1800000.0,
                "/img/boda-catalgo.jpg",
                5,
                "matrimonios",
                true
            ),
            new Producto(
                "Cumpleaños Infantil",
                "Hasta 40 personas",
                85000.0,
                null,
                "/img/cumple-catalogo.jpg",
                10,
                "cumpleanos",
                false
            ),
            new Producto(
                "Evento Corporativo",
                "Hasta 200 personas",
                90000.0,
                null,
                "/img/copo-catalogo.jpg",
                3,
                "corporativos",
                false
            )
        );

        productoRepository.saveAll(productosIniciales);
        System.out.println("====== " + productosIniciales.size() + " PRODUCTOS INICIALES CARGADOS EN H2 ======");
    }
}