import { Component, HostListener, OnInit, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '@/app/services/auth.service';
import { UserEntity } from '@/app/domain/entities/UserEntity';
import { FooterLayoutComponent } from './footer/footer-layout.component';
// import { hasAccess } from '@/helpers';
import { DtoResponseTreeRoleHasPermissionList } from '@/app/domain/dtos/permission/DtoResponseTreeRoleHasPermissionList';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { AuthStore } from '@/app/stores/AuthStore';
import { ToolbarStore } from '@/app/stores/ToolbarStore';
@Component({
  selector: 'app-system-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    AvatarModule,
    TableModule,
    CardModule,
    MenuModule,
    FooterLayoutComponent,
    DialogModule,
    BadgeModule,
    TooltipModule,
    ChipModule
],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css'
})
export class SystemLayoutComponent implements OnInit{


  items: any[] = [];
  visibleSidebar: boolean = true;
  isScreenWide: boolean = true;

  displayDialog: boolean = false;
  authStore = inject(AuthStore)
  toolbarStore = inject(ToolbarStore)
  authService = inject(AuthService)
  user = signal<UserEntity>({
    id : 0,
    name : '',
    email : '',
    constraint : '',
    email_verified_at : '',
    password : '',
    remember_token : '',
    created_at : '',
    updated_at : '',
    role_id : 0,
  })

  permissions = signal<DtoResponseTreeRoleHasPermissionList>([])

  constructor(private router: Router) {
    // this.toolbarStore.restoreStorageIsDark()
    const decoded = this.authStore.decodeJWT(this.authStore.getJWT() || '')
    let valuePermissions = JSON.parse(localStorage.getItem('permissions') ?? '{}').permissions
    this.permissions.update(() =>  valuePermissions)
    this.user.update(() => decoded.user)
    this.visibleSidebar = localStorage.getItem('visibleSidebar') === 'true';
    // effect(() => {
    //   const authenticated = this.authStore.userAuthenticated()
    //   console.log("EFFECT",authenticated)
    //   if(authenticated){
    //     this.user.update(() => authenticated)
    //   }
    // },{
    //   allowSignalWrites : true
    // })
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevent default behavior of closing the sidebar on Esc key press
  }
  ngOnInit() {

    this.items = [
      {
        label: 'Mantenimiento',
        icon: 'pi pi-fw pi-desktop',
        group:true,
        items: [
          { label: 'Cargos', icon: 'pi pi-fw pi-briefcase', route: ['/system/cargos'] , visible : true, badge : 'NUEVO'},
          { label: 'Actividades laborales', icon: 'pi pi-fw pi-list-check', route: ['/system/actividades-laborales'],visible : true, badge : 'NUEVO' },
          { label: 'Personal', icon: 'pi pi-fw pi-id-card', route: ['/system/personales'] , tooltip : 'Registro y control de personal', visible : true },


        ]
      },
    ]
  }
  userMenuItems = [
    { label: 'Perfil', icon: 'pi pi-user', command: () => this.onProfile() },
    { label: 'Salir', icon: 'pi pi-sign-out', command: () => this.onLogout() }
  ];
  onProfile() {
    console.log('Perfil');
    this.router.navigate(['/system/perfil'] );
  }

  onLogout() {
    this.authService.logout()
  }

  toggleDarkMode() {
    this.toolbarStore.toggleDark()
  }

  toggleSidebar(){
    this.visibleSidebar = !this.visibleSidebar;
    localStorage.setItem('visibleSidebar', this.visibleSidebar ? 'true' : 'false');
  }

  onSidebarClose(){
    this.visibleSidebar = false;
    localStorage.setItem('visibleSidebar', 'false');
  }

  onCloseModalCreate(param : any){
    this.toolbarStore.hideThemes()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isScreenWide = window.innerWidth >= 768;
    if (!this.isScreenWide) {
      this.visibleSidebar = false;
    }
  }
}
