import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import { toast } from 'sonner';

interface Material {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export const AdminMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch materials');
        console.error('Error:', error);
        return;
      }

      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const materialData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image_url: formData.get('image_url') as string,
    };

    try {
      let error;
      
      if (editingMaterial) {
        const result = await supabase
          .from('materials')
          .update(materialData)
          .eq('id', editingMaterial.id);
        error = result.error;
      } else {
        const result = await supabase
          .from('materials')
          .insert([materialData]);
        error = result.error;
      }

      if (error) {
        toast.error(`Failed to ${editingMaterial ? 'update' : 'create'} material`);
        console.error('Error:', error);
        return;
      }

      toast.success(`Material ${editingMaterial ? 'updated' : 'created'} successfully`);
      setIsDialogOpen(false);
      setEditingMaterial(null);
      fetchMaterials();
    } catch (error) {
      console.error('Error saving material:', error);
      toast.error('Failed to save material');
    }
  };

  const deleteMaterial = async (materialId: string) => {
    if (!confirm('Are you sure you want to delete this material? This will also delete all associated series and products.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId);

      if (error) {
        toast.error('Failed to delete material');
        console.error('Error:', error);
        return;
      }

      toast.success('Material deleted successfully');
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Failed to delete material');
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Materials Management</CardTitle>
              <CardDescription>
                Manage material categories for your cutting tools
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Material
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMaterial ? 'Edit Material' : 'Add New Material'}
                  </DialogTitle>
                  <DialogDescription>
                    Materials are the top-level categories for your products
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Material Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Steel, Aluminum, Titanium"
                      defaultValue={editingMaterial?.name}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe this material category..."
                      defaultValue={editingMaterial?.description}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL (optional)</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      defaultValue={editingMaterial?.image_url}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingMaterial ? 'Update Material' : 'Create Material'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingMaterial(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="text-center py-8">
              <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No materials found</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first material category
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">
                      {material.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {material.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      {new Date(material.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingMaterial(material);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMaterial(material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};