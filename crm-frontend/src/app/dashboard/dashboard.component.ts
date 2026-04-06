import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../core/services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;  
  intervalId: any;

  constructor(private api: ApiService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
  this.loadUsers();

  this.intervalId = setInterval(() => {
    this.loadUsers();
    }, 5000);
  }

  ngOnDestroy(): void {
  clearInterval(this.intervalId);
  }

  loadUsers() {
     this.api.getUsers().subscribe({
    next: (data) => {
      console.log('Usuarios:', data);
      this.users = data;

      this.cd.detectChanges();
    },
    error: (err) => {
      console.error('Error cargando usuarios', err);
    }
  });
}

  
  eliminarUsuario(id: string) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.api.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editarUsuario(user: any) {
        this.selectedUser = { ...user }; // copiar usuario
    }

    guardarCambios() {
        this.api.updateUser(this.selectedUser._id, this.selectedUser).subscribe({
    next: () => {
      alert('Usuario actualizado');

        this.selectedUser = null; // limpiar formulario
        this.loadUsers(); // recargar tabla
    },
    error: (err) => {
      console.error(err);
    }
  });

}


}
